"use client";
import {useMemo} from "react";

function makeNodes(text) {
  return String(text)
    .split("")
    .map((char, index) => (
      <span className="hover-blur__char transition-transform duration-300" key={`${char}-${index}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
}

export default function HoverBlur({children}) {
  const text = useMemo(() => String(children ?? ""), [children]);
  const chars = useMemo(() => makeNodes(text), [text]);

  return (
    <span className="hover-blur group relative inline-block cursor-default overflow-hidden">
      <span className="hover-blur__original flex transition-transform duration-300 group-hover:-translate-y-0.5">
        {chars}
      </span>
      <span 
        className="hover-blur__clone absolute inset-0 flex opacity-0 blur-md transition-all duration-300 group-hover:opacity-100 group-hover:blur-0" 
        aria-hidden="true"
      >
        {chars}
      </span>
    </span>
  );
}
