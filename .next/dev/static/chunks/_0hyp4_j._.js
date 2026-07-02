(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Navbar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const NAV_LINKS = [
    {
        label: 'Sobre',
        href: '#sobre'
    },
    {
        label: 'Depoimentos',
        href: '#depoimentos'
    },
    {
        label: 'FAQ',
        href: '#faq'
    }
];
/* ─── Variants ────────────────────────────────────────────────────────── */ const navVariants = {
    hidden: {
        opacity: 0,
        y: -10
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 26,
            staggerChildren: 0.07,
            delayChildren: 0.08
        }
    }
};
const itemVariants = {
    hidden: {
        opacity: 0,
        y: -8
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 26
        }
    }
};
function Navbar() {
    _s();
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            const onScroll = {
                "Navbar.useEffect.onScroll": ()=>setIsScrolled(window.scrollY > 20)
            }["Navbar.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "Navbar.useEffect": ()=>window.removeEventListener('scroll', onScroll)
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
        variants: navVariants,
        initial: "hidden",
        animate: "visible",
        className: [
            'fixed top-0 left-0 w-full z-50',
            'flex items-center justify-between',
            'px-8 sm:px-12 py-5',
            'transition-[background,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isScrolled ? 'backdrop-blur-md bg-[#121212]/65 border-b border-white/5' : 'bg-transparent border-b border-transparent'
        ].join(' '),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                variants: itemVariants,
                href: "#",
                className: "text-sm font-light tracking-widest uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors duration-300",
                children: "Montabox"
            }, void 0, false, {
                fileName: "[project]/components/Navbar.jsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: navVariants,
                className: "hidden sm:flex items-center gap-9",
                children: NAV_LINKS.map(({ label, href })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                        variants: itemVariants,
                        href: href,
                        className: "text-[0.72rem] font-light tracking-widest uppercase text-[#acaba9] hover:text-[#eaeaea] transition-colors duration-300",
                        children: label
                    }, href, false, {
                        fileName: "[project]/components/Navbar.jsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/Navbar.jsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                variants: itemVariants,
                href: "#contato",
                whileHover: {
                    scale: 1.02
                },
                whileTap: {
                    scale: 0.98
                },
                className: [
                    'text-[0.72rem] font-light tracking-widest uppercase',
                    'border border-[#acaba9]/50 text-[#eaeaea]',
                    'px-5 py-2',
                    'hover:bg-[#eaeaea] hover:text-[#121212] hover:border-[#eaeaea]',
                    'transition-colors duration-300'
                ].join(' '),
                children: "Orçamento"
            }, void 0, false, {
                fileName: "[project]/components/Navbar.jsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Navbar.jsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_s(Navbar, "UCaI8lpZVGvPrsRoIFYRt2wv0+o=");
_c = Navbar;
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Hero.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function Hero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative h-screen w-full overflow-hidden bg-[#121212] flex items-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute -inset-[50%] pointer-events-none",
                style: {
                    background: 'linear-gradient(120deg, transparent 30%, rgba(234,234,234,0.035) 45%, rgba(234,234,234,0.07) 50%, rgba(234,234,234,0.035) 55%, transparent 70%)'
                },
                animate: {
                    x: [
                        '-8%',
                        '8%'
                    ],
                    y: [
                        '-4%',
                        '4%'
                    ]
                },
                transition: {
                    duration: 9,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: 'mirror'
                }
            }, void 0, false, {
                fileName: "[project]/components/Hero.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.8,
                    delay: 0.3
                },
                className: "relative z-10 p-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-archivo font-light text-[0.95rem] tracking-[0.32em] uppercase text-[#eaeaea]",
                        children: "Montabox"
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.jsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-[#75706f]",
                        children: "Vidraçaria & Serralheria de Alumínio"
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.jsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Hero.jsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Hero.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/About.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>About
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
/* ─── Copy ─────────────────────────────────────────────────────────── */ const TITLE_LINE_1 = 'Vidro com';
const TITLE_LINE_2 = 'precisão.';
const BODY_LEFT = `Somos uma vidraçaria especializada em projetos personalizados de vidro e alumínio para ambientes residenciais e comerciais. Com mais de uma década de experiência no setor, entregamos soluções que unem estética refinada e engenharia de alta performance.`;
const BODY_RIGHT = `Cada projeto é desenvolvido sob medida, do briefing ao acabamento final, com materiais selecionados e instalação feita por nossa própria equipe. Acreditamos que vidro não é apenas material — é luz, amplitude e presença arquitetônica com personalidade.`;
const STATS = [
    {
        value: '10+',
        label: 'anos de mercado'
    },
    {
        value: '2k+',
        label: 'projetos concluídos'
    },
    {
        value: '100%',
        label: 'instalação própria'
    }
];
/* ─── Variants ──────────────────────────────────────────────────────── */ const sectionVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.04
        }
    }
};
/* stagger por caractere: spring preciso, sem bounce */ const charVariants = {
    hidden: {
        opacity: 0,
        y: 16
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 280,
            damping: 28
        }
    }
};
/* fade-up genérico com delay customizável */ const fadeUp = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: (delay = 0)=>({
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 220,
                damping: 26,
                delay
            }
        })
};
const statVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};
/* ─── Animated title (letter-by-letter) ───────────────────────────── */ function AnimatedTitle({ line1, line2 }) {
    const chars1 = line1.split('');
    const chars2 = line2.split('');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
        "aria-label": `${line1} ${line2}`,
        className: "text-[clamp(3rem,7vw,6rem)] font-black tracking-tight leading-[1.02] text-[#eaeaea]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block overflow-hidden",
                children: chars1.map((ch, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        variants: charVariants,
                        className: "inline-block",
                        style: {
                            whiteSpace: ch === ' ' ? 'pre' : 'normal'
                        },
                        children: ch
                    }, `l1-${i}`, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/About.jsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block overflow-hidden pl-[0.08em]",
                children: chars2.map((ch, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        variants: charVariants,
                        className: "inline-block",
                        style: {
                            whiteSpace: ch === ' ' ? 'pre' : 'normal'
                        },
                        children: ch
                    }, `l2-${i}`, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/About.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/About.jsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c = AnimatedTitle;
function About() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-80px 0px'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "sobre",
        ref: ref,
        className: "relative bg-[#121212] overflow-hidden py-28 sm:py-36 px-8 sm:px-12 lg:px-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": true,
                className: "pointer-events-none absolute inset-0",
                style: {
                    background: 'radial-gradient(circle at top left, rgba(172,171,169,0.05) 0%, transparent 60%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/About.jsx",
                lineNumber: 120,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                variants: sectionVariants,
                initial: "hidden",
                animate: inView ? 'visible' : 'hidden',
                className: "relative z-10 max-w-7xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        variants: fadeUp,
                        custom: 0,
                        className: "mb-8 text-[0.68rem] font-light tracking-[0.28em] uppercase text-[#75706f]",
                        children: "Quem somos"
                    }, void 0, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnimatedTitle, {
                        line1: TITLE_LINE_1,
                        line2: TITLE_LINE_2
                    }, void 0, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeUp,
                        custom: 0.18,
                        className: "mt-12 mb-12 h-px bg-[#75706f]/20 w-full"
                    }, void 0, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                variants: fadeUp,
                                custom: 0.28,
                                className: "font-light text-[0.95rem] leading-[1.85] text-[#acaba9]",
                                children: BODY_LEFT
                            }, void 0, false, {
                                fileName: "[project]/components/About.jsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                variants: fadeUp,
                                custom: 0.38,
                                className: "font-light text-[0.95rem] leading-[1.85] text-[#acaba9]",
                                children: BODY_RIGHT
                            }, void 0, false, {
                                fileName: "[project]/components/About.jsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: fadeUp,
                        custom: 0.46,
                        className: "mt-14 mb-14 h-px bg-[#75706f]/20 w-full"
                    }, void 0, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        variants: statVariants,
                        className: "grid grid-cols-3 gap-4",
                        children: STATS.map(({ value, label }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                variants: fadeUp,
                                custom: 0.52 + i * 0.1,
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-[#eaeaea]",
                                        children: value
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.jsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[0.7rem] font-light tracking-[0.18em] uppercase text-[#75706f]",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/components/About.jsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, label, true, {
                                fileName: "[project]/components/About.jsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/About.jsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/About.jsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/About.jsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(About, "O7qYEn3iCrBBWRAefWku+E/MdDM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = About;
var _c, _c1;
__turbopack_context__.k.register(_c, "AnimatedTitle");
__turbopack_context__.k.register(_c1, "About");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/BlurTextReveal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function splitContent(text, html, animationType) {
    if (html) {
        return {
            __html: html
        };
    }
    const raw = typeof text === "string" ? text : "";
    if (animationType === "words") {
        return raw.split(/(\s+)/).map((part, index)=>/\s+/.test(part) ? part : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "blur-text__word",
                children: part
            }, `${part}-${index}`, false, {
                fileName: "[project]/components/ui/BlurTextReveal.jsx",
                lineNumber: 16,
                columnNumber: 9
            }, this));
    }
    return raw.split("").map((char, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "blur-text__char",
            children: char
        }, `${char}-${index}`, false, {
            fileName: "[project]/components/ui/BlurTextReveal.jsx",
            lineNumber: 24,
            columnNumber: 5
        }, this));
}
const BlurTextReveal = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function BlurTextReveal({ as: Tag = "div", text = "", html = "", className = "", animationType = "chars", stagger = 0.05, once = true }, ref) {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timelineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const hasAnimatedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "BlurTextReveal.BlurTextReveal.useImperativeHandle": ()=>rootRef.current
    }["BlurTextReveal.BlurTextReveal.useImperativeHandle"]);
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BlurTextReveal.BlurTextReveal.useMemo[content]": ()=>splitContent(text, html, animationType)
    }["BlurTextReveal.BlurTextReveal.useMemo[content]"], [
        text,
        html,
        animationType
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlurTextReveal.BlurTextReveal.useEffect": ()=>{
            const root = rootRef.current;
            if (!root || hasAnimatedRef.current) return;
            const items = root.querySelectorAll(".blur-text__char, .blur-text__word");
            if (!items.length) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(items, {
                opacity: 0,
                y: 18,
                filter: "blur(10px)"
            });
            const io = new IntersectionObserver({
                "BlurTextReveal.BlurTextReveal.useEffect": (entries)=>{
                    entries.forEach({
                        "BlurTextReveal.BlurTextReveal.useEffect": (entry)=>{
                            if (!entry.isIntersecting) return;
                            timelineRef.current?.kill();
                            timelineRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(items, {
                                opacity: 1,
                                y: 0,
                                filter: "blur(0px)",
                                duration: 0.7,
                                ease: "power3.out",
                                stagger
                            });
                            if (once) {
                                hasAnimatedRef.current = true;
                                io.disconnect();
                            }
                        }
                    }["BlurTextReveal.BlurTextReveal.useEffect"]);
                }
            }["BlurTextReveal.BlurTextReveal.useEffect"], {
                threshold: 0.2
            });
            io.observe(root);
            return ({
                "BlurTextReveal.BlurTextReveal.useEffect": ()=>{
                    io.disconnect();
                    timelineRef.current?.kill();
                }
            })["BlurTextReveal.BlurTextReveal.useEffect"];
        }
    }["BlurTextReveal.BlurTextReveal.useEffect"], [
        stagger,
        once,
        text,
        html,
        animationType
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tag, {
        ref: rootRef,
        className: `blur-text-reveal ${className}`.trim(),
        children: html ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            dangerouslySetInnerHTML: {
                __html: html
            }
        }, void 0, false, {
            fileName: "[project]/components/ui/BlurTextReveal.jsx",
            lineNumber: 85,
            columnNumber: 15
        }, this) : content
    }, void 0, false, {
        fileName: "[project]/components/ui/BlurTextReveal.jsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}, "9M7tNwSx4CkNgywxAuwY2NgsB2Q=")), "9M7tNwSx4CkNgywxAuwY2NgsB2Q=");
_c1 = BlurTextReveal;
const __TURBOPACK__default__export__ = BlurTextReveal;
var _c, _c1;
__turbopack_context__.k.register(_c, "BlurTextReveal$forwardRef");
__turbopack_context__.k.register(_c1, "BlurTextReveal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/FadeInOnScroll.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FadeInOnScroll
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function FadeInOnScroll({ children, className = "", delay = 0, y = 24, duration = 0.7, once = true, start = "top 85%" }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FadeInOnScroll.useEffect": ()=>{
            const node = ref.current;
            if (!node) return;
            const animateIn = {
                "FadeInOnScroll.useEffect.animateIn": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].fromTo(node, {
                        autoAlpha: 0,
                        y
                    }, {
                        autoAlpha: 1,
                        y: 0,
                        delay,
                        duration,
                        ease: "power3.out"
                    });
                }
            }["FadeInOnScroll.useEffect.animateIn"];
            if (!("IntersectionObserver" in window)) {
                animateIn();
                return;
            }
            const observer = new IntersectionObserver({
                "FadeInOnScroll.useEffect": (entries)=>{
                    entries.forEach({
                        "FadeInOnScroll.useEffect": (entry)=>{
                            if (!entry.isIntersecting) return;
                            animateIn();
                            if (once) observer.disconnect();
                        }
                    }["FadeInOnScroll.useEffect"]);
                }
            }["FadeInOnScroll.useEffect"], {
                threshold: 0.15,
                rootMargin: start === "top 100%" ? "0px 0px 100px 0px" : "0px"
            });
            observer.observe(node);
            return ({
                "FadeInOnScroll.useEffect": ()=>observer.disconnect()
            })["FadeInOnScroll.useEffect"];
        }
    }["FadeInOnScroll.useEffect"], [
        delay,
        duration,
        once,
        y,
        start
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `fade-in-on-scroll ${className}`.trim(),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/FadeInOnScroll.jsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(FadeInOnScroll, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = FadeInOnScroll;
var _c;
__turbopack_context__.k.register(_c, "FadeInOnScroll");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/WordShiftButton.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WordShiftButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function splitWords(text) {
    return String(text).split(" ").filter(Boolean).map((word, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "word",
            children: word
        }, `${word}-${index}`, false, {
            fileName: "[project]/components/ui/WordShiftButton.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this));
}
function WordShiftButton({ text, href = "#", target, customClass = "" }) {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const words = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WordShiftButton.useMemo[words]": ()=>splitWords(text)
    }["WordShiftButton.useMemo[words]"], [
        text
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WordShiftButton.useEffect": ()=>{
            const node = rootRef.current;
            if (!node) return;
            const setHovered = {
                "WordShiftButton.useEffect.setHovered": (hovered)=>node.classList.toggle("is-hovered", hovered)
            }["WordShiftButton.useEffect.setHovered"];
            const onEnter = {
                "WordShiftButton.useEffect.onEnter": ()=>setHovered(true)
            }["WordShiftButton.useEffect.onEnter"];
            const onLeave = {
                "WordShiftButton.useEffect.onLeave": ()=>setHovered(false)
            }["WordShiftButton.useEffect.onLeave"];
            node.addEventListener("mouseenter", onEnter);
            node.addEventListener("mouseleave", onLeave);
            node.addEventListener("touchstart", onEnter, {
                passive: true
            });
            node.addEventListener("touchend", onLeave);
            node.addEventListener("touchcancel", onLeave);
            return ({
                "WordShiftButton.useEffect": ()=>{
                    node.removeEventListener("mouseenter", onEnter);
                    node.removeEventListener("mouseleave", onLeave);
                    node.removeEventListener("touchstart", onEnter);
                    node.removeEventListener("touchend", onLeave);
                    node.removeEventListener("touchcancel", onLeave);
                }
            })["WordShiftButton.useEffect"];
        }
    }["WordShiftButton.useEffect"], []);
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: rootRef,
        className: `button_wrapper ${customClass}`.trim(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text",
            children: words
        }, void 0, false, {
            fileName: "[project]/components/ui/WordShiftButton.jsx",
            lineNumber: 44,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/WordShiftButton.jsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: href,
            target: target,
            rel: target === "_blank" ? "noreferrer" : undefined,
            children: content
        }, void 0, false, {
            fileName: "[project]/components/ui/WordShiftButton.jsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    return content;
}
_s(WordShiftButton, "ssZaoE/tFyrRGpJKIRZkpYJ1vuo=");
_c = WordShiftButton;
var _c;
__turbopack_context__.k.register(_c, "WordShiftButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/DividerPlus.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DividerPlus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function DividerPlus({ customClass = "", lineClass = "", plusClass = "", iconColor = "#272727" }) {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const plusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DividerPlus.useEffect": ()=>{
            const root = rootRef.current;
            const line = lineRef.current;
            const plus = plusRef.current;
            if (!root || !line || !plus) return;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(line, {
                scaleX: 0,
                transformOrigin: "left center"
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(plus, {
                autoAlpha: 0,
                scale: 0.8
            });
            const observer = new IntersectionObserver({
                "DividerPlus.useEffect": (entries)=>{
                    entries.forEach({
                        "DividerPlus.useEffect": (entry)=>{
                            if (!entry.isIntersecting) return;
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(line, {
                                scaleX: 1,
                                duration: 0.8,
                                ease: "power3.out"
                            });
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(plus, {
                                autoAlpha: 1,
                                scale: 1,
                                duration: 0.5,
                                ease: "power3.out",
                                delay: 0.1
                            });
                        }
                    }["DividerPlus.useEffect"]);
                }
            }["DividerPlus.useEffect"], {
                threshold: 0.2
            });
            observer.observe(root);
            return ({
                "DividerPlus.useEffect": ()=>observer.disconnect()
            })["DividerPlus.useEffect"];
        }
    }["DividerPlus.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: `line-plus-block ${customClass}`.trim(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: lineRef,
                className: `line ${lineClass}`.trim()
            }, void 0, false, {
                fileName: "[project]/components/ui/DividerPlus.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                ref: plusRef,
                width: "12",
                height: "12",
                viewBox: "0 0 12 12",
                fill: "none",
                className: `plus ${plusClass}`.trim(),
                "aria-hidden": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "6",
                        y1: "0",
                        x2: "6",
                        y2: "12",
                        stroke: iconColor
                    }, void 0, false, {
                        fileName: "[project]/components/ui/DividerPlus.jsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: "12",
                        y1: "6",
                        x2: "0",
                        y2: "6",
                        stroke: iconColor
                    }, void 0, false, {
                        fileName: "[project]/components/ui/DividerPlus.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/DividerPlus.jsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/DividerPlus.jsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(DividerPlus, "8kbQJK6iQqLOhZWYVVxKP6bX0DU=");
_c = DividerPlus;
var _c;
__turbopack_context__.k.register(_c, "DividerPlus");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Testimonials/TestimonialCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TestimonialCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TestimonialCard({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "testimonial-item",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "testimonial-item__company mobile-only",
                children: item.companyName
            }, void 0, false, {
                fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                lineNumber: 5,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "testimonial-item__body",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "testimonial-item__quote",
                        children: item.quoteMessage
                    }, void 0, false, {
                        fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                        lineNumber: 8,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "testimonial-item__footer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "testimonial-item__client",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "testimonial-item__avatar",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.clientImage,
                                        alt: item.companyName,
                                        className: "testimonial-item__avatarImg"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                                        lineNumber: 13,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                                    lineNumber: 12,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "testimonial-item__meta",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "testimonial-item__name",
                                            children: item.clientName
                                        }, void 0, false, {
                                            fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                                            lineNumber: 17,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "testimonial-item__deg",
                                            children: item.clientDeg
                                        }, void 0, false, {
                                            fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                                            lineNumber: 18,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
                lineNumber: 7,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Testimonials/TestimonialCard.jsx",
        lineNumber: 4,
        columnNumber: 5
    }, this);
}
_c = TestimonialCard;
var _c;
__turbopack_context__.k.register(_c, "TestimonialCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/data/TestimonialsData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TestimonialsData",
    ()=>TestimonialsData
]);
const TestimonialsData = [
    {
        id: "Qualidade do material",
        companyName: "Qualidade do material",
        clientName: "Gustavo Salomão",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Não conhecia a Montabox - responsável e proprietário Ronaldo, foi por uma indicação, realmente me surpreenderam em toda a experiência do serviço. Parcelaram no cartão de crédito para me ajudar na parte financeira, me entregaram no prazo combinado( 15 dias). O serviço deles foi impecável e o material de primeira qualidade, o instalador Dhiego é super atencioso e também aos detalhes, não deixaram sujeira após a instalação, realmente fiquei encantado com o serviço e o atendimento, nota 10/10. Parabéns.",
        videoURL: "https://www.youtube.com/embed/rOAsYNtPAmQ?autoplay=1"
    },
    {
        id: "Qualidade do material",
        companyName: "Qualidade do material",
        clientName: "Claudia B.",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Trabalho excelente, material de boa qualidade e acabamento muito bom. Cuidado e eficiência na assistência pós venda me faz indicar os serviços da Montabox.",
        videoURL: "https://www.youtube.com/embed/rOAsYNtPAmQ?autoplay=1"
    },
    {
        id: "Qualidade do material",
        companyName: "Qualidade do material",
        clientName: "Guilherme Daneze",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Ótimo atendimento, muita seriedade no trabalho e qualidade do material é sensacional!",
        videoURL: "https://www.youtube.com/embed/rOAsYNtPAmQ?autoplay=1"
    },
    {
        id: "Acabamento",
        companyName: "Acabamento",
        clientName: "Victoria De Bonis",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Gostaria de destacar o serviço prestado pelo Ronaldo e sua equipe, que realmente superou minhas expectativas. O trabalho foi executado com alta qualidade, apresentando um acabamento impecável e atenção aos detalhes. Além disso, o atendimento foi sempre cordial, eficiente e muito prestativo, demonstrando comprometimento e respeito durante todo o processo. Recomendo fortemente essa equipe a quem busca confiabilidade e excelência."
    },
    {
        id: "Acabamento",
        companyName: "Acabamento",
        clientName: "Barbara Salioni",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Ótimo atendimento, muita educação e atenção!! preço mais barato de todos os orçamentos e qualidade perfeita!"
    },
    {
        id: "Acabamento",
        companyName: "Acabamento",
        clientName: "Milena Govoni",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Atenderam dentro do prazo, super atenciosos e rápidos para realizar serviço."
    },
    {
        id: "Esquadrias",
        companyName: "Esquadrias",
        clientName: "Junior Mazza",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Desde o início, fui muito bem atendido. A empresa apresentou todos os projetos e medidas das esquadrias com clareza e cumpriu integralmente o prazo de entrega. Durante a obra, precisei adiar a entrega do material, e fui prontamente atendido com compreensão. Após a instalação, alguns ajustes foram necessários e foram resolvidos rapidamente pelo Sr. Ronaldo. Destaco a excelente qualidade do pós-venda. Recomendo a empresa..",
        videoURL: "https://www.youtube.com/embed/eKB_kigzDwA?autoplay=1"
    },
    {
        id: "Esquadrias",
        companyName: "Esquadrias",
        clientName: "Mauro Nunes Pereira Junior",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Excelente atendimento com esquadrias de alumínio de qualidade e entrega no prazo combinado!",
        videoURL: "https://www.youtube.com/embed/eKB_kigzDwA?autoplay=1"
    },
    {
        id: "Esquadrias",
        companyName: "Esquadrias",
        clientName: "Bruna Tarina",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Atendimento impecável, produto de excelente qualidade e serviço rápido.Me surpreendi com a eficiência da equipe!",
        videoURL: "https://www.youtube.com/embed/eKB_kigzDwA?autoplay=1"
    },
    {
        id: "Cumpre o que promete",
        companyName: "Cumpre o que promete",
        clientName: "Pinotti Maquinas",
        clientDeg: "Empresário",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Empresa excelente, com atendimento de qualidade, equipe atenciosa e comprometida. Sempre cumpre o que promete e com muita agilidade."
    },
    {
        id: "Cumpre o que promete",
        companyName: "Cumpre o que promete",
        clientName: "André Fávaro",
        clientDeg: "Dr. Oftalmologista - Franca-SP",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Empresa muito competente e idônea, cumpre o que promete!",
        videoURL: "https://www.youtube.com/embed/eKB_kigzDwA?autoplay=1"
    },
    {
        id: "Profissionais",
        companyName: "Profissionais",
        clientName: "Cassio Fouad",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Muito satisfeito com o resultado e entrega antes do prazo combinado. Profissionais atenciosos e acabamento nos mínimos detalhes.Recomendo!.",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    },
    {
        id: "Profissionais",
        companyName: "Profissionais",
        clientName: "Mateus Eduardo Rodrigues",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Muito bom !! Colocou os vidros no prazo que combinou. Quem trabalha com obra sabe que hoje são poucos profissionais que entregam no prazo .",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    },
    {
        id: "Profissionais",
        companyName: "Profissionais",
        clientName: "Cristiane Freitas",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Ótimo atendimento e prossifionais exemplares!",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    },
    {
        id: "Excelência",
        companyName: "Excelência",
        clientName: "Maria M.",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Empresa muita séria e capacitada. Serviços entregues com rapidez e qualidade. Aqui fica nosso muito obrigada ao Ronaldo e toda equipe pelos ótimos serviços prestados.",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    },
    {
        id: "Excelência",
        companyName: "Excelência",
        clientName: "Fuad Saud",
        clientDeg: "Cliente",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Atendimento, preço e qualidade do serviço nota 10. Ja é o terceiro serviço grande com que fechamos e todos foram perfeitos.",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    },
    {
        id: "Excelência",
        companyName: "Excelência",
        clientName: "Naur",
        clientDeg: "Biofarm Tecnologia em Veterinária",
        clientImage: "/images/placeholder.webp",
        quoteMessage: "Atendimento, preço e qualidade do serviço nota 10. Ja é o terceiro serviço grande com que fechamos e todos foram perfeitos.",
        videoURL: "https://www.youtube.com/embed/9F4WsbJ1mrc?autoplay=1"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Testimonials/Testimonials.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Testimonials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/autoplay.mjs [app-client] (ecmascript) <export default as Autoplay>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$effect$2d$fade$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EffectFade$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/effect-fade.mjs [app-client] (ecmascript) <export default as EffectFade>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/swiper/modules/navigation.mjs [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$BlurTextReveal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/BlurTextReveal.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FadeInOnScroll$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/FadeInOnScroll.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WordShiftButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/WordShiftButton.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DividerPlus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/DividerPlus.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Testimonials$2f$TestimonialCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Testimonials/TestimonialCard.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/TestimonialsData.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
// "use client";
// import {useCallback, useRef, useState} from "react";
// import {Swiper, SwiperSlide} from "swiper/react";
// import {Autoplay, EffectFade, Navigation} from "swiper/modules";
// import BlurTextReveal from "../ui/BlurTextReveal";
// import FadeInOnScroll from "../ui/FadeInOnScroll";
// import HoverBlur from "../ui/HoverBlur";
// import WordShiftButton from "../ui/WordShiftButton";
// import DividerPlus from "../ui/DividerPlus";
// import TestimonialCard from "./TestimonialCard";
// import {TestimonialsData} from "../../data/TestimonialsData";
// export default function Testimonials({customClass = "", swiperOptions = {}, showBottomLine = false}) {
//   const swiperRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const closeVideo = useCallback(() => {
//     if (typeof window !== "undefined") {
//       window.dispatchEvent(new Event("trionn-modal:close"));
//     }
//   }, []);
//   const handleSlideChange = useCallback((swiper) => {
//     setActiveIndex(swiper.realIndex);
//   }, []);
//   const handleCompanyClick = useCallback((index) => {
//     swiperRef.current?.slideToLoop(index);
//   }, []);
//   return (
//     <section id="testimonials" className={`testimonials-section ${customClass}`.trim()}>
//       <div className="testimonials-section__container">
//         <div className="testimonials-section__header">
//           <BlurTextReveal
//             as="h2"
//             text="História dos clientes"
//             animationType="chars"
//             stagger={0.05}
//             className="testimonials-section__title"
//           />
//           <div className="testimonials-section__introWrap">
//             <FadeInOnScroll delay={0.3}>
//               <p className="testimonials-section__intro">
//                 Pequenos ou grandes projetos.
//                 <br /> A qualidadde é a mesma.
//               </p>
//             </FadeInOnScroll>
//           </div>
//         </div>
//         <div className="testimonials-section__divider">
//           <DividerPlus
//             customClass="testimonials-section__dividerInner"
//             lineClass="testimonials-section__dividerLine"
//             plusClass="testimonials-section__dividerPlus"
//             iconColor="#272727"
//           />
//         </div>
//         <div className="testimonials-section__main">
//           <div className="testimonials-section__left">
//             <div className="testimonial-company-list">
//               {TestimonialsData.map((item, index) => (
//                 <button
//                   key={item.id}
//                   type="button"
//                   aria-current={activeIndex === index ? "true" : undefined}
//                   aria-label={`Show testimonial from ${item.companyName}`}
//                   className={`testimonial-company-button ${activeIndex === index ? "is-active" : ""}`}
//                   onClick={() => handleCompanyClick(index)}>
//                   <span className="title">{item.companyName}</span>
//                   <span className={`icon ${activeIndex === index ? "is-visible" : ""}`} aria-hidden="true">
//                     →
//                   </span>
//                 </button>
//               ))}
//             </div>
//             <div className="testimonial-nav">
//               <button
//                 type="button"
//                 className="custom-arrow left js-testimonials-prev"
//                 aria-label="Previous testimonial">
//                 <span className="arrow-icon">←</span>
//               </button>
//               <button type="button" className="custom-arrow right js-testimonials-next" aria-label="Next testimonial">
//                 <span className="arrow-icon">→</span>
//               </button>
//             </div>
//           </div>
//           <div className="testimonials-section__swiperWrap">
//             <Swiper
//               modules={[Autoplay, EffectFade, Navigation]}
//               effect="fade"
//               fadeEffect={{crossFade: true}}
//               speed={600}
//               autoplay={{
//                 delay: 5000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               loop
//               navigation={{
//                 prevEl: ".js-testimonials-prev",
//                 nextEl: ".js-testimonials-next",
//               }}
//               onSwiper={(swiper) => {
//                 swiperRef.current = swiper;
//               }}
//               onSlideChange={handleSlideChange}
//               className="testimonials-swiper swiper-row"
//               {...swiperOptions}>
//               {TestimonialsData.map((item) => (
//                 <SwiperSlide key={item.id} className="testimonial-slide">
//                   <TestimonialCard item={item} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="testimonials-section__cta">
//               <WordShiftButton text="Se torne um Cliente →" target="_blank" href="https://wa.me/5516981984000" />
//             </div>
//           </div>
//         </div>
//       </div>
//       {showBottomLine ? (
//         <div className="testimonials-section__bottomLine">
//           <DividerPlus
//             customClass="testimonials-section__dividerInner"
//             lineClass="testimonials-section__dividerLine"
//             plusClass="testimonials-section__dividerPlus"
//             iconColor="#272727"
//           />
//         </div>
//       ) : null}
//     </section>
//   );
// }
"use client";
;
;
;
;
;
;
;
;
;
function Testimonials({ customClass = "", swiperOptions = {}, showBottomLine = false }) {
    _s();
    const swiperRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const handleSlideChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Testimonials.useCallback[handleSlideChange]": (swiper)=>{
            setActiveIndex(swiper.realIndex);
        }
    }["Testimonials.useCallback[handleSlideChange]"], []);
    // Navegação por título (ainda funciona)
    const handleCompanyClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Testimonials.useCallback[handleCompanyClick]": (companyIndex)=>{
            // Encontra o primeiro depoimento daquele grupo
            let targetIndex = 0;
            for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"].length; i++){
                if (__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"][i].companyName === __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"][companyIndex].companyName) {
                    targetIndex = i;
                    break;
                }
            }
            swiperRef.current?.slideToLoop(targetIndex);
        }
    }["Testimonials.useCallback[handleCompanyClick]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "testimonials",
        className: `testimonials-section ${customClass}`.trim(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "testimonials-section__container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "testimonials-section__header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$BlurTextReveal$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                as: "h2",
                                text: "História dos clientes",
                                animationType: "chars",
                                stagger: 0.05,
                                className: "testimonials-section__title"
                            }, void 0, false, {
                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "testimonials-section__introWrap",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$FadeInOnScroll$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    delay: 0.3,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "testimonials-section__intro",
                                        children: [
                                            "Pequenos ou grandes projetos.",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this),
                                            " A qualidade é a mesma."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                    lineNumber: 189,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "testimonials-section__divider",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DividerPlus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            customClass: "testimonials-section__dividerInner",
                            lineClass: "testimonials-section__dividerLine",
                            plusClass: "testimonials-section__dividerPlus",
                            iconColor: "#272727"
                        }, void 0, false, {
                            fileName: "[project]/components/Testimonials/Testimonials.jsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "testimonials-section__main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "testimonials-section__left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "testimonial-company-list",
                                        children: [
                                            ...new Set(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"].map((item)=>item.companyName))
                                        ].map((companyName, index)=>{
                                            const isActive = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"][activeIndex]?.companyName === companyName;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                "aria-current": isActive ? "true" : undefined,
                                                className: `testimonial-company-button ${isActive ? "is-active" : ""}`,
                                                onClick: ()=>handleCompanyClick(index),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "title",
                                                        children: companyName
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                        lineNumber: 219,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `icon ${isActive ? "is-visible" : ""}`,
                                                        "aria-hidden": "true",
                                                        children: "→"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                        lineNumber: 220,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, companyName, true, {
                                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "testimonial-nav",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "custom-arrow left js-testimonials-prev",
                                                "aria-label": "Previous testimonial",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "arrow-icon",
                                                    children: "←"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                    lineNumber: 233,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                lineNumber: 229,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "custom-arrow right js-testimonials-next",
                                                "aria-label": "Next testimonial",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "arrow-icon",
                                                    children: "→"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                    lineNumber: 236,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                lineNumber: 235,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                        lineNumber: 228,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "testimonials-section__swiperWrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
                                        modules: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$autoplay$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Autoplay$3e$__["Autoplay"],
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$effect$2d$fade$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EffectFade$3e$__["EffectFade"],
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"]
                                        ],
                                        effect: "fade",
                                        fadeEffect: {
                                            crossFade: true
                                        },
                                        speed: 600,
                                        autoplay: {
                                            delay: 5000,
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true
                                        },
                                        loop: true,
                                        navigation: {
                                            prevEl: ".js-testimonials-prev",
                                            nextEl: ".js-testimonials-next"
                                        },
                                        onSwiper: (swiper)=>{
                                            swiperRef.current = swiper;
                                        },
                                        onSlideChange: handleSlideChange,
                                        className: "testimonials-swiper swiper-row",
                                        ...swiperOptions,
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$TestimonialsData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TestimonialsData"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                                                className: "testimonial-slide",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Testimonials$2f$TestimonialCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    item: item
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this)
                                            }, index, false, {
                                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                                lineNumber: 264,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                        lineNumber: 242,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "testimonials-section__cta",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$WordShiftButton$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            text: "Se torne um Cliente →",
                                            target: "_blank",
                                            href: "https://wa.me/5516981984000"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                            lineNumber: 271,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                        lineNumber: 270,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Testimonials/Testimonials.jsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            showBottomLine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "testimonials-section__bottomLine",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$DividerPlus$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    customClass: "testimonials-section__dividerInner",
                    lineClass: "testimonials-section__dividerLine",
                    plusClass: "testimonials-section__dividerPlus",
                    iconColor: "#272727"
                }, void 0, false, {
                    fileName: "[project]/components/Testimonials/Testimonials.jsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Testimonials/Testimonials.jsx",
                lineNumber: 278,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Testimonials/Testimonials.jsx",
        lineNumber: 177,
        columnNumber: 5
    }, this);
}
_s(Testimonials, "8SoQtWnbUYHuS951hJAvuNNss5M=");
_c = Testimonials;
var _c;
__turbopack_context__.k.register(_c, "Testimonials");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/FAQ.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FAQ
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function FAQItem({ item, index, isOpen, onToggle }) {
    _s();
    const [tilt, setTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        rx: 0,
        ry: 0
    });
    const [glow, setGlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: "50%",
        y: "50%"
    });
    const [hovering, setHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleMouseMove = (e)=>{
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({
            rx: -py * 5,
            ry: px * 5
        });
        setGlow({
            x: `${e.clientX - rect.left}px`,
            y: `${e.clientY - rect.top}px`
        });
    };
    const handleMouseLeave = ()=>{
        setHovering(false);
        setTilt({
            rx: 0,
            ry: 0
        });
    };
    const panelId = `faq-panel-${item.id}`;
    const buttonId = `faq-trigger-${item.id}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 22
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            amount: 0.15
        },
        transition: {
            duration: 0.6,
            delay: index * 0.08,
            ease: "easeOut"
        },
        onMouseEnter: ()=>setHovering(true),
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        style: {
            transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${hovering ? 4 : 0}px)`,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hovering ? "rgba(234,234,234,0.22)" : "rgba(234,234,234,0.08)",
            transition: hovering ? "border-color .3s ease" : "transform .5s ease, border-color .3s ease"
        },
        className: "relative overflow-hidden rounded bg-[#121212]/70 backdrop-blur-[6px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 transition-opacity duration-[400ms]",
                style: {
                    opacity: hovering ? 1 : 0,
                    background: `radial-gradient(220px circle at ${glow.x} ${glow.y}, rgba(234,234,234,0.10), transparent 70%)`
                }
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                id: buttonId,
                "aria-controls": panelId,
                "aria-expanded": isOpen,
                onClick: onToggle,
                className: "relative z-10 flex w-full items-center justify-between gap-6 px-6 py-5 text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[0.92rem] text-[#eaeaea] pr-4",
                        children: item.question
                    }, void 0, false, {
                        fileName: "[project]/components/FAQ.jsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        animate: {
                            rotate: isOpen ? 45 : 0
                        },
                        transition: {
                            duration: 0.3,
                            ease: "easeOut"
                        },
                        className: "shrink-0 text-[#acaba9]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M12 5v14",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/FAQ.jsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M5 12h14",
                                    strokeLinecap: "round"
                                }, void 0, false, {
                                    fileName: "[project]/components/FAQ.jsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/FAQ.jsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FAQ.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                id: panelId,
                role: "region",
                "aria-labelledby": buttonId,
                initial: false,
                animate: {
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                },
                transition: {
                    duration: 0.35,
                    ease: "easeInOut"
                },
                className: "relative z-10 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "px-6 pb-5 text-[0.85rem] leading-relaxed text-[#acaba9]",
                    children: item.answer
                }, void 0, false, {
                    fileName: "[project]/components/FAQ.jsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FAQ.jsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(FAQItem, "1IX/XhJqJJAcBvGPUpo5g8vPCYA=");
_c = FAQItem;
function FAQ({ faqs }) {
    _s1();
    const [openId, setOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const toggle = (id)=>setOpenId((prev)=>prev === id ? -1 : id);
    // Schema.org FAQPage — ajuda o Google a exibir rich snippets de pergunta/resposta
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f)=>({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: f.answer
                }
            }))
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "faq",
        className: "relative w-full overflow-hidden bg-[#2c2c2c] px-6 sm:px-10 py-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                type: "application/ld+json",
                dangerouslySetInnerHTML: {
                    __html: JSON.stringify(jsonLd)
                }
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none absolute -top-44 -left-28 w-[480px] h-[480px] rounded-full",
                style: {
                    background: "rgba(172,171,169,0.14)",
                    filter: "blur(70px)"
                },
                animate: {
                    x: [
                        0,
                        60,
                        0
                    ],
                    y: [
                        0,
                        40,
                        0
                    ]
                },
                transition: {
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full",
                style: {
                    background: "rgba(234,234,234,0.05)",
                    filter: "blur(70px)"
                },
                animate: {
                    x: [
                        0,
                        -50,
                        0
                    ],
                    y: [
                        0,
                        -30,
                        0
                    ]
                },
                transition: {
                    duration: 26,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "pointer-events-none absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full",
                style: {
                    background: "rgba(117,112,111,0.18)",
                    filter: "blur(70px)"
                },
                animate: {
                    x: [
                        0,
                        -40,
                        0
                    ],
                    y: [
                        0,
                        30,
                        0
                    ],
                    scale: [
                        1,
                        1.15,
                        1
                    ]
                },
                transition: {
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }, void 0, false, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto max-w-3xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-archivo text-[0.7rem] tracking-[0.3em] uppercase text-[#acaba9]",
                        children: "FAQ"
                    }, void 0, false, {
                        fileName: "[project]/components/FAQ.jsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-2 font-archivo font-light text-2xl sm:text-3xl text-[#eaeaea]",
                        children: "Perguntas frequentes"
                    }, void 0, false, {
                        fileName: "[project]/components/FAQ.jsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-10 flex flex-col gap-3",
                        children: faqs.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FAQItem, {
                                item: item,
                                index: i,
                                isOpen: openId === item.id,
                                onToggle: ()=>toggle(item.id)
                            }, item.id, false, {
                                fileName: "[project]/components/FAQ.jsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/FAQ.jsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FAQ.jsx",
                lineNumber: 125,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FAQ.jsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s1(FAQ, "aNugGhH/Yjowu41428r3s2xYlo8=");
_c1 = FAQ;
var _c, _c1;
__turbopack_context__.k.register(_c, "FAQItem");
__turbopack_context__.k.register(_c1, "FAQ");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0hyp4_j._.js.map