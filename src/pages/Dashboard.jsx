import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import { Button } from "@/components/ui/button";

const SYSTEM_PROMPT = `Você é o Leitão IA, um tech lead sênior meio doidão: décadas de trik em produção, café até no soro, zero paciência com enrolação mas didático até a raiz.
Regras de comportamento:
- Responda sempre em português (PT-BR), sempre em primeira pessoa como Leitão IA.
- Tom caótico-divertido: gírias, uma piada ou analogia tosca aqui e ali, emojis com moderação. Mas nunca sacrifique a resposta técnica por causa da piada.
- Ensine "doidão": use exemplos malucos, comparações inusitadas (ex: comparar closures com sanduíche, ponteiros com controle remoto perdido), mas a explicação técnica por trás tem que estar correta e completa.
- Seja direto e curto por padrão; só se estenda quando o assunto exigir.
- Quando o código tiver bug ou gambiarra, zoa com carinho primeiro e depois corrige com uma explicação real.
- Nunca invente API/biblioteca que não existe; se não tiver certeza, avisa que pode estar chutando.`;

const SAUDACAO_INICIAL =
  "E AÍ, dev! 🐷⚡ Aqui quem fala é o Leitão IA, seu tech lead particular meio doidão. Bora resolver esse código antes que ele resolva você primeiro? Manda a dúvida, o erro ou a gambiarra que tá te perseguindo.";

const MODELO = "gemini-2.5-flash";
const ESTADO_KEY = "leitao-ia-conversas";
const HISTORICO_KEY_ANTIGO = "leitao-ia-historico"; // formato usado antes de existir múltiplas conversas
const MAX_CONTEXTO = 20; // qtd. de mensagens recentes mandadas pra API a cada request
const TITULO_PADRAO = "Nova conversa";

function gerarId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `conversa-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function criarConversaVazia() {
  return {
    id: gerarId(),
    titulo: TITULO_PADRAO,
    mensagens: [{ de: "ia", texto: SAUDACAO_INICIAL }],
    criadaEm: Date.now(),
  };
}

function gerarTitulo(texto) {
  const limpo = texto.trim();
  return limpo.length > 36 ? `${limpo.slice(0, 36).trim()}…` : limpo;
}

function carregarEstado() {
  try {
    const salvo = localStorage.getItem(ESTADO_KEY);
    if (salvo) {
      const estado = JSON.parse(salvo);
      if (estado?.conversas?.length) return estado;
    }

    // migração: formato antigo guardava só uma lista de mensagens
    const antigo = localStorage.getItem(HISTORICO_KEY_ANTIGO);
    if (antigo) {
      const mensagens = JSON.parse(antigo);
      if (Array.isArray(mensagens) && mensagens.length) {
        const conversa = {
          id: gerarId(),
          titulo: "Conversa anterior",
          mensagens,
          criadaEm: Date.now(),
        };
        return { conversas: [conversa], conversaAtivaId: conversa.id };
      }
    }
  } catch (erro) {
    console.error("Não deu pra ler o histórico salvo:", erro);
  }

  const conversa = criarConversaVazia();
  return { conversas: [conversa], conversaAtivaId: conversa.id };
}

export default function Dashboard() {
  const [estado, setEstado] = useState(carregarEstado);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const { conversas, conversaAtivaId } = estado;
  const conversaAtiva =
    conversas.find((c) => c.id === conversaAtivaId) ?? conversas[0];
  const mensagens = conversaAtiva?.mensagens ?? [];

  const clienteRef = useRef(null);
  if (!clienteRef.current) {
    clienteRef.current = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });
  }

  useEffect(() => {
    try {
      localStorage.setItem(ESTADO_KEY, JSON.stringify(estado));
    } catch (erro) {
      console.error("Não deu pra salvar o histórico:", erro);
    }
  }, [estado]);

  const handleNovaConversa = () => {
    const nova = criarConversaVazia();
    setEstado((prev) => ({
      conversas: [nova, ...prev.conversas],
      conversaAtivaId: nova.id,
    }));
    setSidebarAberta(false);
  };

  const handleSelecionarConversa = (id) => {
    setEstado((prev) => ({ ...prev, conversaAtivaId: id }));
    setSidebarAberta(false);
  };

  const handleExcluirConversa = (id, evento) => {
    evento.stopPropagation();
    setEstado((prev) => {
      const restantes = prev.conversas.filter((c) => c.id !== id);
      if (restantes.length === 0) {
        const nova = criarConversaVazia();
        return { conversas: [nova], conversaAtivaId: nova.id };
      }
      const conversaAtivaId =
        prev.conversaAtivaId === id ? restantes[0].id : prev.conversaAtivaId;
      return { conversas: restantes, conversaAtivaId };
    });
  };

  const handleSendMessage = async () => {
    const texto = userMessage.trim();
    if (!texto || loading || !conversaAtiva) return;

    const idConversa = conversaAtiva.id;
    const historicoAtualizado = [
      ...conversaAtiva.mensagens,
      { de: "user", texto },
    ];
    const tituloAtualizado =
      conversaAtiva.titulo === TITULO_PADRAO
        ? gerarTitulo(texto)
        : conversaAtiva.titulo;

    setEstado((prev) => ({
      ...prev,
      conversas: prev.conversas.map((c) =>
        c.id === idConversa
          ? { ...c, mensagens: historicoAtualizado, titulo: tituloAtualizado }
          : c,
      ),
    }));
    setUserMessage("");
    setLoading(true);

    try {
      const contents = historicoAtualizado.slice(-MAX_CONTEXTO).map((m) => ({
        role: m.de === "user" ? "user" : "model",
        parts: [{ text: m.texto }],
      }));

      const resposta = await clienteRef.current.models.generateContent({
        model: MODELO,
        contents,
        config: { systemInstruction: SYSTEM_PROMPT },
      });

      const textoResposta = resposta.text.trim();
      setEstado((prev) => ({
        ...prev,
        conversas: prev.conversas.map((c) =>
          c.id === idConversa
            ? { ...c, mensagens: [...c.mensagens, { de: "ia", texto: textoResposta }] }
            : c,
        ),
      }));
    } catch (erro) {
      console.error(erro);
      setEstado((prev) => ({
        ...prev,
        conversas: prev.conversas.map((c) =>
          c.id === idConversa
            ? {
                ...c,
                mensagens: [
                  ...c.mensagens,
                  { de: "ia", texto: "Deu ruim pra gerar a resposta. Olha o console." },
                ],
              }
            : c,
        ),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="relative flex h-screen flex-col overflow-hidden bg-[#0b0b0f] text-white">
      {/* fundo com blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#7c3aed] opacity-30 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#ff2ec4] opacity-25 blur-[120px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* header */}
      <header className="relative z-10 flex items-center justify-between border-b-2 border-[#c6ff00] px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarAberta(true)}
            className="grid size-9 place-items-center rotate-[2deg] border-2 border-white/30 text-sm font-black text-white/70 transition-colors hover:border-[#c6ff00] hover:text-[#c6ff00]"
            aria-label="Abrir histórico de conversas"
          >
            ☰
          </button>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rotate-[-4deg] border-2 border-black bg-[#c6ff00] text-lg font-black text-black shadow-[4px_4px_0_#ff2ec4]">
              🧠
            </span>
            <div className="leading-tight">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c6ff00]">
                Leitão IA
              </p>
              <p className="max-w-[45vw] truncate text-xs text-white/50">
                {conversaAtiva?.titulo ?? "modo conversa"}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleNovaConversa}
            className="rotate-[-2deg] border-2 border-white/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/60 transition-colors hover:border-[#ff2ec4] hover:text-[#ff2ec4]"
          >
            nova conversa
          </button>
          <span className="rotate-[2deg] border-2 border-[#00f0ff] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#00f0ff]">
            online
          </span>
        </div>
      </header>

      {/* sidebar de histórico */}
      {sidebarAberta && (
        <div
          className="fixed inset-0 z-20 bg-black/60"
          onClick={() => setSidebarAberta(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r-2 border-[#c6ff00] bg-[#0b0b0f] transition-transform duration-200 ${
          sidebarAberta ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-2 border-[#c6ff00] px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#c6ff00]">
            histórico
          </p>
          <button
            type="button"
            onClick={() => setSidebarAberta(false)}
            className="grid size-7 place-items-center border-2 border-white/30 text-xs font-black text-white/70 hover:border-[#ff2ec4] hover:text-[#ff2ec4]"
            aria-label="Fechar histórico"
          >
            ✕
          </button>
        </div>

        <button
          type="button"
          onClick={handleNovaConversa}
          className="mx-4 mt-4 rotate-[-1deg] border-2 border-[#c6ff00] px-3 py-2 text-xs font-black uppercase tracking-wider text-[#c6ff00] shadow-[4px_4px_0_#ff2ec4] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#ff2ec4]"
        >
          + nova conversa
        </button>

        <div className="scrollbar-none mt-4 flex-1 overflow-y-auto px-4 pb-4">
          {conversas.map((c) => (
            <div
              key={c.id}
              onClick={() => handleSelecionarConversa(c.id)}
              className={`group mb-2 flex cursor-pointer items-center justify-between gap-2 border-2 px-3 py-2 text-xs font-medium transition-colors ${
                c.id === conversaAtivaId
                  ? "border-[#c6ff00] text-[#c6ff00]"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              <span className="truncate">{c.titulo}</span>
              <button
                type="button"
                onClick={(e) => handleExcluirConversa(c.id, e)}
                className="shrink-0 text-white/30 hover:text-[#ff2ec4]"
                aria-label="Excluir conversa"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* área de mensagens */}
      <div className="scrollbar-none relative z-10 mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-10">
        {mensagens.map((m, i) => (
          <div
            key={i}
            className={
              m.de === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={
                m.de === "user"
                  ? "max-w-[80%] rotate-[1deg] border-2 border-black bg-[#c6ff00] px-4 py-3 text-sm font-medium text-black shadow-[6px_6px_0_#ff2ec4]"
                  : "max-w-[80%] rotate-[-1deg] border-2 border-[#00f0ff] bg-black/60 px-4 py-3 text-sm whitespace-pre-wrap text-white shadow-[6px_6px_0_#7c3aed] backdrop-blur"
              }
            >
              {m.de === "ia" && (
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#00f0ff]">
                  Leitão IA
                </p>
              )}
              {m.texto}
            </div>
          </div>
        ))}

        {/* indicador "digitando" */}
        {loading && (
          <div className="flex justify-start">
            <div className="rotate-[-1deg] border-2 border-white/20 bg-black/60 px-4 py-3 shadow-[6px_6px_0_#7c3aed] backdrop-blur">
              <span className="flex gap-1">
                <span className="size-2 rounded-full bg-[#c6ff00]" />
                <span className="size-2 rounded-full bg-[#c6ff00] opacity-60" />
                <span className="size-2 rounded-full bg-[#c6ff00] opacity-30" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* barra de input */}
      <div className="relative z-10 border-t-2 border-[#c6ff00] bg-black/70 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
          <div className="flex flex-1 items-center gap-2 rotate-[-0.5deg] border-2 border-black bg-white shadow-[6px_6px_0_#ff2ec4] focus-within:shadow-[3px_3px_0_#ff2ec4]">
            <textarea
              rows={1}
              placeholder="Pergunta alguma coisa doida pra Leitão IA..."
              className="w-full resize-none bg-transparent px-4 py-3 text-sm font-medium text-black placeholder:text-black/40 focus:outline-none disabled:opacity-50"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            size="lg"
            className="rotate-[-1.5deg] border-2 border-black bg-[#c6ff00] px-6 text-sm font-black uppercase tracking-wider text-black shadow-[6px_6px_0_#ff2ec4] transition-transform hover:translate-x-1 hover:translate-y-1 hover:rotate-0 hover:bg-[#c6ff00] hover:shadow-[3px_3px_0_#ff2ec4] disabled:pointer-events-none disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={loading || !userMessage.trim()}
          >
            ⚡ Enviar
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] uppercase tracking-widest text-white/30">
          a Leitão IA usa a API do Gemini e pode inventar bug — confere sempre
        </p>
      </div>
    </section>
  );
}
