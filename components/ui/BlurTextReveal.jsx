"use client";
import {Children, cloneElement, isValidElement, useRef, useMemo} from "react";
import {motion, useInView} from "framer-motion";

function BlurTextReveal({
  as: Tag = "h2",
  children,
  text = "",
  html = "",
  className = "",
  animationType = "chars",
  stagger = 0.05,
  duration = 1.0,
  ease = [0.25, 0.46, 0.45, 0.94],
  once = true,
  play,
  ...props
}) {
  const rootRef = useRef(null);
  const isInView = useInView(rootRef, {once, margin: "-10% 0px -10% 0px"});

  const content = children || text || html;


  const itemsCount = useMemo(() => {
    if (typeof content !== "string") return 20; 
    return animationType === "words" ? content.split(/\s+/).length : content.length;
  }, [content, animationType]);

  const randomOrder = useMemo(() => {
    return Array.from({ length: itemsCount }, (_, i) => i).sort(() => Math.random() - 0.5);
  }, [itemsCount]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(12px)",
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease,

        delay: randomOrder[i % itemsCount] * stagger,
      },
    }),
  };

  const animateState = play !== undefined ? (play ? "visible" : "hidden") : (isInView ? "visible" : "hidden");

  return (
    <Tag ref={rootRef} className={`blur-text-reveal ${className}`.trim()} {...props}>
      <span className="inline-block">
        {html ? (
          <span dangerouslySetInnerHTML={{__html: html}} />
        ) : (
          <SplitText content={content} type={animationType} variants={itemVariants} animateState={animateState} />
        )}
      </span>
    </Tag>
  );
}

function SplitText({content, type, variants, animateState}) {
  let itemIdx = 0;

  const renderContent = (c) => {
    if (Array.isArray(c)) {
      return Children.map(c, (child) => renderContent(child));
    }

    if (isValidElement(c)) {
      return cloneElement(c, undefined, renderContent(c.props.children));
    }

    if (typeof c !== "string") return c;

    if (type === "words") {
      return c.split(/(\s+)/).map((part, i) => {
        if (/\s+/.test(part)) return part;
        const currentIdx = itemIdx++;
        return (
          <motion.span 
            key={i} 
            custom={currentIdx}
            variants={variants} 
            initial="hidden"
            animate={animateState}
            className="blur-word inline-block"
          >
            {part}
          </motion.span>
        );
      });
    }

    return c.split("").map((char, i) => {
      const currentIdx = itemIdx++;
      return (
        <motion.span 
          key={i} 
          custom={currentIdx}
          variants={variants} 
          initial="hidden"
          animate={animateState}
          className="blur-char inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      );
    });
  };

  return renderContent(content);
}

export default BlurTextReveal;
