// "use client";
// import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef} from "react";
// import {gsap} from "gsap";

// function splitContent(text, html, animationType) {
//   if (html) {
//     return {__html: html};
//   }

//   const raw = typeof text === "string" ? text : "";
//   if (animationType === "words") {
//     return raw.split(/(\s+)/).map((part, index) =>
//       /\s+/.test(part) ? (
//         part
//       ) : (
//         <span className="blur-text__word" key={`${part}-${index}`}>
//           {part}
//         </span>
//       ),
//     );
//   }

//   return raw.split("").map((char, index) => (
//     <span className="blur-text__char" key={`${char}-${index}`}>
//       {char}
//     </span>
//   ));
// }

// const BlurTextReveal = forwardRef(function BlurTextReveal(
//   {as: Tag = "div", text = "", html = "", className = "", animationType = "chars", stagger = 0.05, once = true},
//   ref,
// ) {
//   const rootRef = useRef(null);
//   const timelineRef = useRef(null);
//   const hasAnimatedRef = useRef(false);

//   useImperativeHandle(ref, () => rootRef.current);

//   const content = useMemo(() => splitContent(text, html, animationType), [text, html, animationType]);

//   useEffect(() => {
//     const root = rootRef.current;
//     if (!root || hasAnimatedRef.current) return;

//     const items = root.querySelectorAll(".blur-text__char, .blur-text__word");
//     if (!items.length) return;

//     gsap.set(items, {opacity: 0, y: 18, filter: "blur(10px)"});

//     const io = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (!entry.isIntersecting) return;

//           timelineRef.current?.kill();
//           timelineRef.current = gsap.to(items, {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.7,
//             ease: "power3.out",
//             stagger,
//           });

//           if (once) {
//             hasAnimatedRef.current = true;
//             io.disconnect();
//           }
//         });
//       },
//       {threshold: 0.2},
//     );

//     io.observe(root);

//     return () => {
//       io.disconnect();
//       timelineRef.current?.kill();
//     };
//   }, [stagger, once, text, html, animationType]);

//   return (
//     <Tag ref={rootRef} className={`blur-text-reveal ${className}`.trim()}>
//       {html ? <span dangerouslySetInnerHTML={{__html: html}} /> : content}
//     </Tag>
//   );
// });

// export default BlurTextReveal;
"use client";
import {Children, cloneElement, forwardRef, isValidElement, useEffect, useImperativeHandle, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BlurTextReveal = forwardRef(function BlurTextReveal(
  {
    as: Tag = "h2",
    children,
    text = "",
    html = "",
    className = "",
    animationType = "chars", // "chars" | "words"
    stagger = 0.05,
    duration = 0.8,
    ease = "power2.out",
    start = "top 90%",
    once = true,
    play,
    ...props
  },
  ref,
) {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);

  // Suporte a children, text ou html
  const content = children || text || html;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Split manual melhorado
      const items = root.querySelectorAll(animationType === "words" ? ".blur-word" : ".blur-char");

      if (!items.length) return;

      gsap.set(items, {
        opacity: 0,
        y: 25,
        filter: "blur(12px)",
        willChange: "transform, filter, opacity",
      });

      const animation = {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration,
        ease,
        stagger: {
          each: stagger,
          from: "random", // deixa mais orgânico como no original
        },
      };

      // Quando controlado externamente, aguarda a transição que revela a seção.
      if (play !== undefined) {
        if (!play) return;
        timelineRef.current = gsap.to(items, animation);
        return;
      }

      timelineRef.current = gsap.to(items, {
        ...animation,
        scrollTrigger: {
          trigger: root,
          start,
          once,
          toggleActions: "play none none reverse",
        },
      });
    },
    {scope: rootRef, dependencies: [animationType, stagger, duration, ease, start, once, play]},
  );

  // Cleanup
  useEffect(() => {
    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <Tag ref={rootRef} className={`blur-text-reveal ${className}`.trim()} {...props}>
      {html ? <span dangerouslySetInnerHTML={{__html: html}} /> : <SplitText content={content} type={animationType} />}
    </Tag>
  );
});

// Componente auxiliar para split
function SplitText({content, type}) {
  if (Array.isArray(content)) {
    return Children.map(content, (child) => <SplitText content={child} type={type} />);
  }

  if (isValidElement(content)) {
    return cloneElement(content, undefined, <SplitText content={content.props.children} type={type} />);
  }

  if (typeof content !== "string") return content;

  if (type === "words") {
    return content.split(/(\s+)/).map((part, i) =>
      /\s+/.test(part) ? (
        part
      ) : (
        <span key={i} className="blur-word inline-block">
          {part}
        </span>
      ),
    );
  }

  // chars
  return content.split("").map((char, i) => (
    <span key={i} className="blur-char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default BlurTextReveal;
