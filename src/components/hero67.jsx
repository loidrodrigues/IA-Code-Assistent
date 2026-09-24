import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero67 = ({ className }) => {
  return (
    <section
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#0b0b0f] text-white",
        className,
      )}
    >
      <style>{`
        @keyframes blob67 {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-60px) scale(1.15); }
          66% { transform: translate(-30px,40px) scale(0.9); }
        }
        @keyframes spin67 { to { transform: rotate(360deg); } }
        @keyframes float67 {
          0%,100% { transform: translateY(0) rotate(var(--r,0deg)); }
          50% { transform: translateY(-22px) rotate(var(--r,0deg)); }
        }
        @keyframes marquee67 { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes glitch67 {
          0%,100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 40% 0); transform: translate(-4px,2px); }
          40% { clip-path: inset(60% 0 5% 0); transform: translate(4px,-2px); }
          60% { clip-path: inset(10% 0 70% 0); transform: translate(-3px,1px); }
          80% { clip-path: inset(45% 0 30% 0); transform: translate(3px,-1px); }
        }
        @keyframes hue67 { to { filter: hue-rotate(360deg); } }
        .glitch67 { position: relative; }
        .glitch67::before, .glitch67::after {
          content: attr(data-text); position: absolute; inset: 0;
          background: #0b0b0f;
        }
        .glitch67::before { color: #00f0ff; animation: glitch67 2.6s infinite linear alternate; }
        .glitch67::after { color: #ff2ec4; animation: glitch67 3.4s infinite linear alternate-reverse; }
      `}</style>

      {/* animated color blobs */}
      <div className="pointer-events-none absolute inset-0 [animation:hue67_18s_linear_infinite]">
        <div className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-[#ff2ec4] opacity-40 blur-[100px] [animation:blob67_14s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-1/3 h-[32rem] w-[32rem] rounded-full bg-[#7c3aed] opacity-40 blur-[120px] [animation:blob67_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[#c6ff00] opacity-30 blur-[110px] [animation:blob67_17s_ease-in-out_infinite]" />
      </div>

      {/* grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />

      {/* floating stickers */}
      <span className="absolute left-[8%] top-[18%] text-5xl [--r:-12deg] [animation:float67_6s_ease-in-out_infinite] select-none">👾</span>
      <span className="absolute right-[10%] top-[22%] text-5xl [--r:14deg] [animation:float67_7s_ease-in-out_infinite] select-none">💾</span>
      <span className="absolute bottom-[14%] left-[14%] text-5xl [--r:8deg] [animation:float67_5.5s_ease-in-out_infinite] select-none">🧠</span>
      <span className="absolute bottom-[20%] right-[16%] text-5xl [--r:-10deg] [animation:float67_8s_ease-in-out_infinite] select-none">⚡</span>

      {/* spinning star badge */}
      <div className="absolute right-[6%] top-[40%] hidden lg:block">
        <div className="relative h-32 w-32 [animation:spin67_9s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_20px_#c6ff00]">
            <path
              d="M50 0l12 30 32-8-20 26 26 20-33 3 5 33-24-23-24 23 5-33-33-3 26-20L6 22l32 8z"
              fill="#c6ff00"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-xs font-black uppercase text-black">
            beta
          </span>
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 py-32 text-center">
        <span className="rotate-[-2deg] border-2 border-[#c6ff00] bg-black px-4 py-1.5 text-xs font-black uppercase tracking-[0.3em] text-[#c6ff00] shadow-[6px_6px_0_#ff2ec4]">
          Leitão IA · modo caótico
        </span>

        <h1
          data-text="DICAS DE CÓDIGO INJETADAS DIRETO NO SEU CÉREBRO"
          className="glitch67 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
        >
          DICAS DE CÓDIGO INJETADAS DIRETO NO SEU CÉREBRO
        </h1>

        <p className="max-w-xl text-balance text-lg text-white/70">
          A <span className="font-bold text-[#00f0ff]">Leitão IA</span> despeja
          sabedoria de programação personalizada na sua veia — pra dev de todo
          nível que não tem medo de coisa doida.
        </p>

        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <Link to="/Dashboard">
            <Button
              size="lg"
              className="rotate-[-1.5deg] border-2 border-black bg-[#c6ff00] px-8 text-base font-black uppercase tracking-wider text-black shadow-[8px_8px_0_#ff2ec4] transition-transform hover:rotate-0 hover:translate-x-1 hover:translate-y-1 hover:bg-[#c6ff00] hover:shadow-[4px_4px_0_#ff2ec4]"
            >
              ⚡ Começar agora
            </Button>
          </Link>
          <Link
            to="/sobre"
            className="rotate-[1.5deg] border-2 border-[#00f0ff] px-6 py-2.5 text-sm font-black uppercase tracking-wider text-[#00f0ff] transition-colors hover:bg-[#00f0ff] hover:text-black"
          >
            ver na moral
          </Link>
        </div>
      </div>

      {/* bottom marquee ticker */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y-2 border-[#c6ff00] bg-black py-3">
        <div className="flex w-max [animation:marquee67_16s_linear_infinite]">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-6 pr-6 text-sm font-black uppercase tracking-widest text-[#c6ff00]">
              <span>react</span><span className="text-[#ff2ec4]">✦</span>
              <span>python</span><span className="text-[#ff2ec4]">✦</span>
              <span>rust</span><span className="text-[#ff2ec4]">✦</span>
              <span>clean code</span><span className="text-[#ff2ec4]">✦</span>
              <span>algoritmos</span><span className="text-[#ff2ec4]">✦</span>
              <span>debugar às 3h da manhã</span><span className="text-[#ff2ec4]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero67 };
