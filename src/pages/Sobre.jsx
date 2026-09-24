import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Sobre() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0b0b0f] text-white">
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

      <header className="relative z-10 flex items-center justify-between border-b-2 border-[#c6ff00] px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rotate-[-4deg] border-2 border-black bg-[#c6ff00] text-lg font-black text-black shadow-[4px_4px_0_#ff2ec4]">
            🧠
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c6ff00]">
              Leitão IA
            </p>
            <p className="text-xs text-white/50">modo conversa</p>
          </div>
        </Link>
        <Link to="/dashboard">
          <Button
            size="sm"
            className="rotate-[1.5deg] border-2 border-black bg-[#00f0ff] px-4 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0_#ff2ec4] hover:bg-[#00f0ff]"
          >
            ir pro chat
          </Button>
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
        <div>
          <span className="rotate-[-2deg] inline-block border-2 border-[#c6ff00] bg-black px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-[#c6ff00] shadow-[6px_6px_0_#ff2ec4]">
            sobre a bagaça toda
          </span>
          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
            O que é a{" "}
            <span className="text-[#00f0ff]">Leitão IA</span>?
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            Um chatbot pra tirar dúvida de programação que decidiu que ensinar
            sério é chato. Roda em cima da API do Gemini, tem a personalidade
            de um tech lead que já debugou coisa demais e não tem mais
            paciência — só carinho e piada ruim. Feito pra apresentação de
            aula, então relaxa que a cota gratuita aguenta o tranco.
          </p>
        </div>

        <div className="rotate-[-1deg] border-2 border-[#ff2ec4] bg-black/60 p-6 shadow-[8px_8px_0_#7c3aed] backdrop-blur">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#ff2ec4]">
            quem criou essa doideira
          </p>
          <h2 className="mt-2 text-2xl font-black uppercase">
            Loid Rodrigues
          </h2>
          <p className="mt-3 text-white/70">
            Dev que abriu o repositório, deu um commit chamado{" "}
            <span className="font-bold text-[#c6ff00]">"first commit"</span>{" "}
            (clássico, ninguém nunca quebrou essa tradição) e a partir daí foi
            de "vou treinar um modelo local" pra "ah foda-se, bora de API" em
            tempo recorde — decisão certa, aliás. 🐷⚡
          </p>
          <p className="mt-3 text-white/70">
            Contato oficial pra elogios, bugs ou memes:{" "}
            <span className="font-bold text-[#00f0ff]">
              loidpadre@gmail.com
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            "orientado a café",
            "resolve com gambiarra e depois refatora (às vezes)",
            "git commit -m \"first commit\" e seguiu o baile",
            "acredita em README depois",
          ].map((tag) => (
            <span
              key={tag}
              className="rotate-[1deg] border-2 border-white/20 bg-black/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
