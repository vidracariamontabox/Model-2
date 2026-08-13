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
    animationType = "chars",
    stagger = 0.05,
    duration = 1.2,
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

  const content = children || text || html;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

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

  return content.split("").map((char, i) => (
    <span key={i} className="blur-char inline-block">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default BlurTextReveal;
