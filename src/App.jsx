import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["about", "stack", "projects", "personas", "contact"];

const STACK = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "REST APIs", "WebSockets"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  { category: "DevOps", items: ["Docker", "Git", "CI/CD", "Linux"] },
];

const PROJECTS = [
  {
    name: "ApiCards",
    desc: "API REST para gerenciamento de cartões com autenticação e integração de dados em TypeScript.",
    tech: ["TypeScript", "Node.js", "REST"],
    url: "https://github.com/arthvin/ApiCards",
  },
  {
    name: "arthur-books-server",
    desc: "Servidor backend para aplicação de gerenciamento de livros com JavaScript.",
    tech: ["JavaScript", "Node.js", "API"],
    url: "https://github.com/arthvin/arthur-books-server",
  },
  {
    name: "ProjetoMicrowave",
    desc: "Simulação de micro-ondas com lógica orientada a objetos em C#.",
    tech: ["C#", "OOP", ".NET"],
    url: "https://github.com/arthvin/ProjetoMicrowave",
  },
  {
    name: "projeto-python",
    desc: "Projeto experimental em Python explorando automação e scripts utilitários.",
    tech: ["Python", "Automation"],
    url: "https://github.com/arthvin/projeto-python",
  },
];

const PERSONAS = [
  {
    id: "frontend",
    label: "UI Engineer",
    avatar: "◈",
    color: "#22d3ee",
    colorDim: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.3)",
    tagline: "Interfaces que fazem sentido.",
    bio: "Obcecado com micro-interações, acessibilidade e performance percebida. Se o botão não tem o timing certo no hover, não está pronto.",
    traits: [
      { label: "Stack", value: "React · TypeScript · Tailwind" },
      { label: "Foco", value: "UX/UI · Animações · Design System" },
      { label: "Ferramenta fav.", value: "Figma + devtools abertos" },
      { label: "Filosofia", value: "\"Less, but better.\"" },
    ],
  },
  {
    id: "backend",
    label: "Backend Dev",
    avatar: "⬡",
    color: "#818cf8",
    colorDim: "rgba(129,140,248,0.08)",
    border: "rgba(129,140,248,0.3)",
    tagline: "Sistemas que aguentam o tranco.",
    bio: "APIs bem estruturadas, filas, cache e zero downtime. Gosto de resolver gargalos antes que virem problema.",
    traits: [
      { label: "Stack", value: "NestJS · Node.js · PostgreSQL" },
      { label: "Foco", value: "Escalabilidade · WebSockets · Auth" },
      { label: "Ferramenta fav.", value: "Insomnia + logs no terminal" },
      { label: "Filosofia", value: "\"Fail fast, recover faster.\"" },
    ],
  },
  {
    id: "fullstack",
    label: "Full Stack",
    avatar: "◎",
    color: "#34d399",
    colorDim: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    tagline: "Do banco ao browser.",
    bio: "Transito entre camadas sem perder contexto. Entrego features de ponta a ponta e entendo o custo de cada decisão no stack inteiro.",
    traits: [
      { label: "Stack", value: "React · NestJS · Docker · Redis" },
      { label: "Foco", value: "Entrega completa · Integração" },
      { label: "Ferramenta fav.", value: "Monorepo + CI/CD pipeline" },
      { label: "Filosofia", value: "\"Ship it, then improve it.\"" },
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHovering(true); };
    const out = () => setHovering(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-[9999] rounded-full mix-blend-difference"
      style={{
        width: hovering ? 40 : 8,
        height: hovering ? 40 : 8,
        background: "#e2e8f0",
        top: pos.y - (hovering ? 20 : 4),
        left: pos.x - (hovering ? 20 : 4),
        transition: "width 0.2s, height 0.2s, top 0.05s linear, left 0.05s linear",
      }}
    />
  );
}

function GridBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}

function PersonaCard({ persona, active, onClick }) {
  return (
    <button
      data-hover
      onClick={onClick}
      style={{
        borderColor: active ? persona.border : "rgba(51,65,85,0.6)",
        background: active ? persona.colorDim : "transparent",
        transition: "all 0.3s ease",
      }}
      className="w-full text-left p-5 border rounded-none flex items-center gap-4 group"
    >
      <span
        className="text-2xl shrink-0 w-10 h-10 flex items-center justify-center border"
        style={{
          color: active ? persona.color : "#475569",
          borderColor: active ? persona.border : "rgba(51,65,85,0.5)",
          background: active ? persona.colorDim : "transparent",
          transition: "all 0.3s",
        }}
      >
        {persona.avatar}
      </span>
      <div>
        <p
          className="text-xs tracking-widest uppercase font-semibold"
          style={{ color: active ? persona.color : "#64748b", transition: "color 0.3s" }}
        >
          {persona.label}
        </p>
        <p className="text-[11px] text-slate-600 mt-0.5">{persona.tagline}</p>
      </div>
    </button>
  );
}

function PersonasSection() {
  const [active, setActive] = useState(0);
  const p = PERSONAS[active];

  return (
    <section id="personas" className="relative py-28 border-t border-slate-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="mb-16">
            <p className="text-cyan-500 text-xs tracking-[0.3em] uppercase mb-3">04 — Modos</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Qual versão você precisa?</h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/30 mb-px">
            {PERSONAS.map((persona, i) => (
              <PersonaCard
                key={persona.id}
                persona={persona}
                active={active === i}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* Detail Panel */}
          <div
            className="border border-t-0 p-8 md:p-10"
            style={{
              borderColor: p.border,
              background: p.colorDim,
              transition: "all 0.4s ease",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl" style={{ color: p.color }}>{p.avatar}</span>
                  <span
                    className="text-xs tracking-[0.3em] uppercase font-semibold"
                    style={{ color: p.color }}
                  >
                    {p.label}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{p.bio}</p>
              </div>

              <div className="flex flex-col gap-4">
                {p.traits.map((t) => (
                  <div key={t.label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: p.color, opacity: 0.7 }}>
                      {t.label}
                    </span>
                    <span className="text-slate-300 text-sm">{t.value}</span>
                    <div className="h-px bg-slate-800/60 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080c10] text-slate-300 font-mono selection:bg-cyan-500/20 selection:text-cyan-300 cursor-none">
      <Cursor />
      <GridBg />

      {/* NAV — transparent glass */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(8,12,16,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(148,163,184,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo("about")}
            className="text-slate-100 text-sm font-semibold tracking-widest uppercase hover:text-cyan-400 transition-colors"
          >
            arthvin<span className="text-cyan-500">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-xs tracking-widest uppercase transition-colors"
                style={{ color: activeSection === l ? "#22d3ee" : "#475569" }}
                onMouseEnter={e => { if (activeSection !== l) e.target.style.color = "#cbd5e1"; }}
                onMouseLeave={e => { if (activeSection !== l) e.target.style.color = "#475569"; }}
              >
                {l}
              </button>
            ))}
            <a
              href="https://github.com/arthvin"
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-widest uppercase text-slate-500 hover:text-slate-200 transition-colors"
            >
              GitHub ↗
            </a>
          </div>

          {/* mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className={`w-5 h-px bg-current transition-transform mb-1.5 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-px bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-px bg-current transition-transform mt-1.5 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-6 py-4 flex flex-col gap-4"
            style={{
              background: "rgba(8,12,16,0.85)",
              borderTop: "1px solid rgba(148,163,184,0.06)",
            }}
          >
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l)} className="text-xs tracking-widest uppercase text-left text-slate-400 hover:text-cyan-400 transition-colors">
                {l}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" className="relative min-h-screen flex items-center pt-14">
        <div className="max-w-5xl mx-auto px-6 py-32 w-full">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-cyan-500 text-xs tracking-[0.3em] uppercase">Software Engineering</span>
            <span className="h-px flex-1 max-w-[60px] bg-cyan-500/40" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-100 leading-[1.05] mb-8 tracking-tight">
            Arthur<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #67e8f9, #818cf8)" }}>
              Semensati
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
            Engenheiro de Software Full Stack com foco em aplicações escaláveis, comunicação em tempo real e interfaces que entregam experiência de qualidade. Trabalho com Node.js, React, NestJS e o ecossistema moderno de APIs.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("projects")}
              data-hover
              className="px-6 py-3 text-xs tracking-widest uppercase border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              Ver projetos
            </button>
            <button
              onClick={() => scrollTo("contact")}
              data-hover
              className="px-6 py-3 text-xs tracking-widest uppercase border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200 transition-all"
            >
              Contato
            </button>
          </div>

          <div className="absolute bottom-10 left-6 flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-500/60" />
            <span className="text-[10px] tracking-[0.3em] text-slate-600 uppercase rotate-90 origin-center mt-8">scroll</span>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative py-28">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="mb-16">
              <p className="text-cyan-500 text-xs tracking-[0.3em] uppercase mb-3">02 — Stack</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Tecnologias</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/40">
            {STACK.map((group, i) => (
              <FadeIn key={group.category} delay={i * 0.08}>
                <div className="bg-[#080c10] p-8 h-full hover:bg-slate-900/50 transition-colors group">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-cyan-500/70 mb-5">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 border border-slate-700/80 text-slate-400 group-hover:border-slate-600 group-hover:text-slate-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-28 border-t border-slate-800/40">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="mb-16">
              <p className="text-cyan-500 text-xs tracking-[0.3em] uppercase mb-3">03 — Projetos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Repositórios</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/40">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="group block bg-[#080c10] p-8 h-full hover:bg-slate-900/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-slate-100 font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                      {p.name}
                    </span>
                    <span className="text-slate-600 group-hover:text-cyan-500 transition-colors text-lg leading-none">↗</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] tracking-wider uppercase text-cyan-600/70 border border-cyan-900/60 px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-8 text-center">
              <a
                href="https://github.com/arthvin?tab=repositories"
                target="_blank"
                rel="noreferrer"
                data-hover
                className="inline-block text-xs tracking-widest uppercase text-slate-500 hover:text-cyan-400 transition-colors border-b border-slate-700 hover:border-cyan-500/50 pb-0.5"
              >
                Ver todos os repositórios ↗
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PERSONAS */}
      <PersonasSection />

      {/* CONTACT */}
      <section id="contact" className="relative py-28 border-t border-slate-800/40">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="mb-4">
              <p className="text-cyan-500 text-xs tracking-[0.3em] uppercase mb-3">05 — Contato</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-100 mb-8 leading-tight">
              Vamos construir<br />
              <span className="text-slate-600">algo juntos.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-slate-500 text-sm max-w-md mb-12 leading-relaxed">
              Aberto a oportunidades, freelas e projetos interessantes. Me encontre pelo LinkedIn ou GitHub.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.linkedin.com/in/arthursemensati/"
                target="_blank"
                rel="noreferrer"
                data-hover
                className="group inline-flex items-center gap-3 px-6 py-4 border border-slate-700 hover:border-cyan-500/50 transition-all"
              >
                <span className="text-xs tracking-widest uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">LinkedIn</span>
                <span className="text-slate-600 group-hover:text-cyan-500 transition-colors">↗</span>
              </a>
              <a
                href="https://github.com/arthvin"
                target="_blank"
                rel="noreferrer"
                data-hover
                className="group inline-flex items-center gap-3 px-6 py-4 border border-slate-700 hover:border-slate-500 transition-all"
              >
                <span className="text-xs tracking-widest uppercase text-slate-400 group-hover:text-slate-200 transition-colors">GitHub</span>
                <span className="text-slate-600 group-hover:text-slate-400 transition-colors">↗</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/40 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-700">
            © {new Date().getFullYear()} Arthur Semensati
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-slate-700">
            Built with React + Vite + Tailwind
          </span>
        </div>
      </footer>
    </div>
  );
}