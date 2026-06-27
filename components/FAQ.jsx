"use client";

import {useState} from "react";
import {motion} from "framer-motion";

export default function FAQ({faqs}) {
  const [openId, setOpenId] = useState(-1);

  const toggle = (id) => setOpenId((prev) => (prev === id ? -1 : id));

  const setGlow = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--faq-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--faq-y", `${e.clientY - rect.top}px`);
  };

  const clearGlow = (e) => {
    e.currentTarget.style.removeProperty("--faq-x");
    e.currentTarget.style.removeProperty("--faq-y");
  };

  // Schema.org FAQPage — ajuda o Google a exibir rich snippets de pergunta/resposta
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {"@type": "Answer", text: f.answer},
    })),
  };

  return (
    <section id="faq" className="relative w-full bg-[#121212] px-6 sm:px-10 py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />

      <div className="mx-auto max-w-3xl">
        <p className="font-archivo text-[0.7rem] tracking-[0.3em] uppercase text-[#75706f]">FAQ</p>
        <h2 className="mt-2 font-archivo font-light text-2xl sm:text-3xl text-[#eaeaea]">Perguntas frequentes</h2>

        <ul className="mt-10 space-y-3">
          {faqs.map((item) => {
            const open = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-trigger-${item.id}`;

            return (
              <li
                key={item.id}
                onMouseMove={setGlow}
                onMouseLeave={clearGlow}
                className="group relative overflow-hidden rounded-sm border border-[#75706f]/20 bg-[#2c2c2c]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(220px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(234,234,234,0.06), transparent 70%)",
                  }}
                />

                <button
                  type="button"
                  id={buttonId}
                  aria-controls={panelId}
                  aria-expanded={open}
                  onClick={() => toggle(item.id)}
                  className="relative flex w-full items-center justify-between gap-6 px-6 py-5 text-left">
                  <span className="text-[0.95rem] text-[#eaeaea] pr-4">{item.question}</span>
                  <motion.span
                    animate={{rotate: open ? 45 : 0}}
                    transition={{duration: 0.3, ease: "easeOut"}}
                    className="shrink-0 text-[#acaba9]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14" strokeLinecap="round" />
                      <path d="M5 12h14" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>

                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={false}
                  animate={{height: open ? "auto" : 0, opacity: open ? 1 : 0}}
                  transition={{duration: 0.35, ease: "easeInOut"}}
                  className="overflow-hidden">
                  <p className="px-6 pb-5 text-[0.875rem] leading-relaxed text-[#acaba9]">{item.answer}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
