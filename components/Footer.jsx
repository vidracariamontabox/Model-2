"use client";

import React from "react";
import { motion } from "framer-motion";

function FacebookIcon(props) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,[...]" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.7[...]" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-[...]" />
    </svg>
  );
}

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#acaba9] hover:text-white transition-colors duration-300 text-[0.8rem] uppercase tracking-widest font-light"
  >
    {children}
  </a>
);

const contactLinks = [
  { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083338509379" },
  { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/montabox_vidros/" },
  { icon: <WhatsAppIcon />, label: "WhatsApp", href: "https://wa.me/5516981984000" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000000] text-[#eaeaea] pt-24 pb-12 px-8 sm:px-12 lg:px-20 overflow-hidden border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section: CTA / Brand Intro */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
          <div className="max-w-md">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[0.9] uppercase tracking-tighter mb-6">
              Elevando o <span className="text-white/40">Padrão</span> do seu Projeto.
            </h2>
            <p className="text-[#75706f] text-sm font-light leading-relaxed max-w-xs uppercase tracking-tight">
              Soluções exclusivas em vidros e esquadrias de alto desempenho para arquitetura contemporânea.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
             <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#75706f]">Onde estamos</span>
                <address className="not-italic text-sm font-light text-[#acaba9] max-w-[200px] leading-relaxed">
                  Ribeirão Preto, SP <br />
                  Brasil
                </address>
             </div>
             <div className="flex flex-col gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#75706f]">Contato</span>
                <a href="mailto:contato@montabox.com.br" className="text-sm font-light text-[#acaba9] hover:text-white transition-colors">
                  contato@montabox.com.br
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12">
          <div className="flex flex-col space-y-4 max-w-xs">
            <div className="flex flex-col">
              <span className="text-white text-3xl font-black uppercase tracking-tight leading-none">Montabox</span>
              <span className="text-[#acaba9] text-sm font-light uppercase tracking-tight">
                Vidraçaria e Serralheria de Alumínio
              </span>
            </div>
          </div>

          <div>
            {/* <h4 className="text-white text-sm uppercase font-semibold mb-6">Contatos</h4> */}
            <div className="flex items-center gap-4">
              {contactLinks.map(({icon, label, href}) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:text-[#3ca2fa] transition-colors"
                >
                  {icon}
                </a>
             </div>
          </div>

          <div className="text-[#d1d1d1]">
            {/* <h4 className="text-white text-sm uppercase font-semibold mb-4">Endereço</h4> */}
            <p className="text-sm leading-6 tracking-widest">
              R. Virgílio Pedro Ribeiro, 70 - Planalto Itália, Jaboticabal - SP CEP: 14890-448
            </p>
            <div className="mt-6">
              {/* <h5 className="text-sm uppercase tracking-[0.24em] text-[#acaba9] mb-2">Horário</h5> */}
              <p className="text-sm leading-6 tracking-widest">Das 07:30 às 17:30 — Segunda a Sexta</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation & Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-white/5">
          <div className="flex flex-col gap-4">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#75706f] mb-2">Navegação</span>
            <FooterLink href="#sobre">Sobre</FooterLink>
            <FooterLink href="#servicos">Serviços</FooterLink>
            <FooterLink href="#portfolio">Portfólio</FooterLink>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#75706f] mb-2">Social</span>
            <FooterLink href="https://www.instagram.com/montabox_vidros/">Instagram</FooterLink>
            <FooterLink href="https://www.facebook.com/profile.php?id=100083338509379">Facebook</FooterLink>
            <FooterLink href="https://br.pinterest.com/montabox_vidros/">Pinterest</FooterLink>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#75706f] mb-2">Legal</span>
            <FooterLink href="#">Privacidade</FooterLink>
            <FooterLink href="#">Termos</FooterLink>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6">
            <a 
              href="https://wa.me/5516981984000" 
              className="group relative inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="text-[0.7rem] uppercase tracking-[0.2em] font-medium">Falar com Especialista</span>
            </a>
          </div>
        </div>

        {/* Bottom Section: Large Brand Typography */}
        <div className="relative mt-20 select-none pointer-events-none">
          <h1 className="text-[15vw] font-black text-center leading-none uppercase tracking-[-0.05em] text-white/[0.02] transition-colors duration-700 hover:text-white/[0.05]">
            Montabox
          </h1>
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#75706f]">
              © {currentYear} Montabox
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#75706f]">
              Vidraçaria e Serralheria
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#75706f]">Design by</span>
            <a 
              href="https://www.instagram.com/bms_trafego/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[0.6rem] uppercase tracking-[0.2em] text-[#acaba9] hover:text-white transition-colors font-black"
            >
              BMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
