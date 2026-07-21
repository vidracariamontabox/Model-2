"use client";

import React, {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <text
        x="50%"
        y="57%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="19"
        fontWeight="700">
        F
      </text>
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Instagram</title>
      <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
    </svg>
  );
}

function PinterestIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <text
        x="50%"
        y="57%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="19"
        fontWeight="700">
        P
      </text>
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M12 21s6-5.3 6-11a6 6 0 0 0-12 0c0 5.7 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

export const TextHoverEffect = ({text, duration, className}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({x: 0, y: 0});
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({cx: "50%", cy: "50%"});

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 700 140"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({x: e.clientX, y: e.clientY})}
      className={`select-none uppercase cursor-pointer overflow-visible ${className ?? ""}`}>
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#80eeb4" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{cx: "50%", cy: "50%"}}
          animate={maskPosition}
          transition={{duration: duration ?? 0, ease: "easeOut"}}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{opacity: hovered ? 0.7 : 0}}>
        {text}
      </text>
      <motion.text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold dark:stroke-[#3ca2fa99]"
        initial={{strokeDashoffset: 1000, strokeDasharray: 1000}}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}>
        {text}
      </motion.text>
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold">
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};

export default function Footer() {
  const contactLinks = [
    {
      icon: <FacebookIcon className="h-5 w-5 text-[#eaeaea]" />,
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100083338509379",
    },
    {
      icon: <InstagramIcon className="h-5 w-5 text-[#eaeaea]" />,
      label: "Instagram",
      href: "https://www.instagram.com/montabox_vidros/",
    },
    {
      icon: <PinterestIcon className="h-5 w-5 text-[#eaeaea]" />,
      label: "Pinterest",
      href: "https://br.pinterest.com/montabox_vidros/",
    },
    {
      icon: <MapPinIcon className="h-5 w-5 text-[#eaeaea]" />,
      label: "Maps",
      href: "https://share.google/e7G9PhQQ1gHud9Q6f",
    },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-16 pb-12">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <span className="text-white text-3xl font-black uppercase tracking-tight leading-none">Montabox</span>
              <span className="text-[#acaba9] text-sm font-light uppercase tracking-tight">
                Vidraçaria e Serralheria de Alumínio
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg uppercase font-semibold mb-6">Contatos</h4>
            <div className="flex items-center gap-4">
              {contactLinks.map(({icon, label, href}) => (
                <a key={label} href={href} aria-label={label} className="hover:text-[#3ca2fa] transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-700 my-8" />

        <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
          <TextHoverEffect text="Montabox" className="z-50" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex flex-col items-start gap-1 text-[#acaba9]">
            <p>&copy; {new Date().getFullYear()} Montabox. Todos os direitos reservados.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <a
              href="https://www.instagram.com/bms_trafego/"
              target="_blank"
              className="text-[#acaba9] hover:text-[#3ca2fa] transition-colors">
              BMS
            </a>
          </div>
        </div>
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
