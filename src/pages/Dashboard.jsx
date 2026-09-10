import { Button } from "@/components/ui/button";

const MENSAGENS = [
  {
    de: "ia",
    texto:
      "Fala, dev! Sou a Leitão IA. Manda a dúvida de programação que eu resolvo — código, arquitetura, debug às 3h da manhã, o que for.",
  },
  {
    de: "user",
    texto: "como eu centralizo uma div sem chorar?",
  },
  {
    de: "ia",
    texto:
      "Flexbox no pai: display:flex; align-items:center; justify-content:center. Chororô cancelado.",
  },
];

export default function Dashboard() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0b0b0f] text-white">
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
          <span className="grid size-10 place-items-center rotate-[-4deg] border-2 border-black bg-[#c6ff00] text-lg font-black text-black shadow-[4px_4px_0_#ff2ec4]">
            🧠
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c6ff00]">
              Leitão IA
            </p>
            <p className="text-xs text-white/50">modo conversa</p>
          </div>
        </div>
        <span className="rotate-[2deg] border-2 border-[#00f0ff] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#00f0ff]">
          online
        </span>
      </header>

      {/* área de mensagens */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 overflow-y-auto px-6 py-10">
        {MENSAGENS.map((m, i) => (
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
                  : "max-w-[80%] rotate-[-1deg] border-2 border-[#00f0ff] bg-black/60 px-4 py-3 text-sm text-white shadow-[6px_6px_0_#7c3aed] backdrop-blur"
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

        {/* indicador "digitando" (só visual) */}
        <div className="flex justify-start">
          <div className="rotate-[-1deg] border-2 border-white/20 bg-black/60 px-4 py-3 shadow-[6px_6px_0_#7c3aed] backdrop-blur">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-[#c6ff00]" />
              <span className="size-2 rounded-full bg-[#c6ff00] opacity-60" />
              <span className="size-2 rounded-full bg-[#c6ff00] opacity-30" />
            </span>
          </div>
        </div>
      </div>

      {/* barra de input */}
      <div className="relative z-10 border-t-2 border-[#c6ff00] bg-black/70 px-6 py-5 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-end gap-3">
          <div className="flex flex-1 items-center gap-2 rotate-[-0.5deg] border-2 border-black bg-white shadow-[6px_6px_0_#ff2ec4] focus-within:shadow-[3px_3px_0_#ff2ec4]">
            <textarea
              rows={1}
              placeholder="Pergunta alguma coisa doida pra Leitão IA..."
              className="w-full resize-none bg-transparent px-4 py-3 text-sm font-medium text-black placeholder:text-black/40 focus:outline-none"
            />
          </div>
          <Button
            size="lg"
            className="rotate-[-1.5deg] border-2 border-black bg-[#c6ff00] px-6 text-sm font-black uppercase tracking-wider text-black shadow-[6px_6px_0_#ff2ec4] transition-transform hover:translate-x-1 hover:translate-y-1 hover:rotate-0 hover:bg-[#c6ff00] hover:shadow-[3px_3px_0_#ff2ec4]"
          >
            ⚡ Enviar
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] uppercase tracking-widest text-white/30">
          a Leitão IA pode inventar bug — confere sempre
        </p>
      </div>
    </section>
  );
}
