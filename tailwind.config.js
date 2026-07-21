/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './data/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {

      // ─── FONTE ────────────────────────────────────────────────
      fontFamily: {
        archivo: ['var(--font-archivo)', 'sans-serif'],
        familjen: ['var(--font-familjen)', 'sans-serif'],  // títulos
        neuehaas: ['var(--font-neuehaas)', 'sans-serif'],  // textos
        sheila: ['var(--font-sheila)', 'sans-serif'],  // services
      },
      // ─── PALETA MONTABOX ──────────────────────────────────────
      // Permite usar: bg-preto, text-inox, border-cinza, etc.
      colors: {
        branco: '#eaeaea',
        inox: '#acaba9',
        cinza: '#75706f',
        chumbo: '#2c2c2c',
        preto: '#121212',
        preto2: '#000000',
      },

      // ─── TIPOGRAFIA ───────────────────────────────────────────
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1' }],
        '3xs': ['0.68rem', { lineHeight: '1' }],
        '4xs': ['0.70rem', { lineHeight: '1' }],
        '5xs': ['0.72rem', { lineHeight: '1' }],
        'body-sm': ['0.85rem', { lineHeight: '1.6' }],
        'body-md': ['0.92rem', { lineHeight: '1.7' }],
        'body-lg': ['0.95rem', { lineHeight: '1.85' }],
        'fluid-hero': 'clamp(3rem, 7vw, 6rem)',
        'fluid-section': 'clamp(1.8rem, 4vw, 3rem)',
      },

      // ─── LINE HEIGHT ──────────────────────────────────────────
      lineHeight: {
        'tight-2': '1.02',
        'body': '1.85',
      },

      // ─── LETTER SPACING ───────────────────────────────────────
      letterSpacing: {
        'ultra': '0.18em',
        'wide-2': '0.28em',
        'wide-3': '0.30em',
        'wide-4': '0.32em',
      },

      // ─── LARGURAS ─────────────────────────────────────────────
      width: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '200vw': '200vw',
      },

      // ─── ALTURAS ──────────────────────────────────────────────
      height: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '300vh': '300vh',
      },

      // ─── BACKDROP BLUR ────────────────────────────────────────
      backdropBlur: {
        '6px': '6px',
      },

      // ─── TRANSIÇÃO ────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },

      // ─── ESPAÇAMENTO CUSTOMIZADO ──────────────────────────────
      spacing: {
        '0.08em': '0.08em',
      },

    },
  },

  // ─── SAFELIST ─────────────────────────────────────────────────
  // Garante que classes com valores arbitrários não sejam purgadas
  safelist: [
    // Cores arbitrárias usadas no projeto
    'bg-[#121212]',
    'bg-[#121212]/70',
    'bg-[#2c2c2c]',
    'bg-[#75706f]/20',
    'bg-[#acaba9]/30',
    'bg-[#acaba9]/40',
    'bg-[linear - gradient(0deg, #FFFFFF_0 %, #D2D2D2_100 %)]',
    'bg-white/5',
    'border-white/5',
    'border-white/10',
    'text-[#75706f]',
    'text-[#acaba9]',
    'text-[#eaeaea]',
    // Tipografia arbitrária
    'text-[0.45rem]',
    'text-[0.65rem]',
    'text-[0.68rem]',
    'text-[0.7rem]',
    'text-[0.72rem]',
    'text-[0.85rem]',
    'text-[0.92rem]',
    'text-[0.95rem]',
    'text-[clamp(1.8rem,4vw,3rem)]',
    'text-[clamp(3rem,7vw,6rem)]',
    // Leading e tracking arbitrários
    'leading-[1.02]',
    'leading-[1.85]',
    'tracking-[0.18em]',
    'tracking-[0.28em]',
    'tracking-[0.3em]',
    'tracking-[0.32em]',
    'pl-[0.08em]',
    // Dimensões arbitrárias
    'h-[300px]',
    'h-[420px]',
    'h-[480px]',
    'h-[300vh]',
    'w-[300px]',
    'w-[420px]',
    'w-[480px]',
    'w-[200vw]',
    // Posicionamento arbitrário
    'left-[60%]',
    'top-[40%]',
    '-inset-[50%]',
    // Outros
    'backdrop-blur-[6px]',
    'duration-[400ms]',
    'hover:border-white/20',
    'hover:text-[#eaeaea]',
    'group-hover:text-[#acaba9]',
    'group-hover:text-white',
  ],

  plugins: [],
};
