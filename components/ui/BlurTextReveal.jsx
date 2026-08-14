"use client";
import {Children, cloneElement, forwardRef, isValidElement, useRef} from "react";
import {motion, useInView} from "framer-motion";

const BlurTextReveal = forwardRef(function BlurTextReveal(
  {
    as: Tag = "h2",
    children,
    text = "",
    html = "",
    className = "",
    animationType = "chars",
    stagger = 0.05,
    duration = 0.8,
    ease = [0.22, 1, 0.36, 1],
    start = "top 90%",
    once = true,
    play,
    ...props
  },
  ref,
) {
  const rootRef = useRef(null);
  const isInView = useInView(rootRef, {once, margin: "-10% 0px -10% 0px"});

  const content = children || text || html;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease,
      },
    },
  };

  // Se play for controlado externamente, usamos ele, senão usamos o inView
  const animateState = play !== undefined ? (play ? "visible" : "hidden") : (isInView ? "visible" : "hidden");

  return (
    <Tag ref={rootRef} className={`blur-text-reveal ${className}`.trim()} {...props}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={animateState}
        className="inline-block"
      >
        {html ? (
          <span dangerouslySetInnerHTML={{__html: html}} />
        ) : (
          <SplitText content={content} type={animationType} variants={itemVariants} />
        )}
      </motion.span>
    </Tag>
  );
});

function SplitText({content, type, variants}) {
  if (Array.isArray(content)) {
    return Children.map(content, (child) => <SplitText content={child} type={type} variants={variants} />);
  }

  if (isValidElement(content)) {
    return cloneElement(content, undefined, <SplitText content={content.props.children} type={type} variants={variants} />);
  }

  if (typeof content !== "string") return content;

  if (type === "words") {
    return content.split(/(\s+)/).map((part, i) =>
      /\s+/.test(part) ? (
        part
      ) : (
        <motion.span key={i} variants={variants} className="blur-word inline-block">
          {part}
        </motion.span>
      ),
    );
  }

  return content.split("").map((char, i) => (
    <motion.span key={i} variants={variants} className="blur-char inline-block">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
}

export default BlurTextReveal;
