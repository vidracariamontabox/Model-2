
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './data/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {


      
      fontFamily: {
        familjen: ['var(--font-familjen)', 'sans-serif'],
        neuehaas: ['var(--font-neuehaas)', 'sans-serif'],
        'ivy-presto': ['var(--font-ivy-presto)', 'serif'],
      },


      
      colors: {
        branco: '#eaeaea',
        inox: '#acaba9',
        cinza: '#75706f',
        chumbo: '#2c2c2c',
        preto: '#121212',
        preto2: '#000000',
      },


      
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


      lineHeight: {
        'tight-2': '1.02',
        'body': '1.85',
      },


      letterSpacing: {
        'ultra': '0.18em',
        'wide-2': '0.28em',
        'wide-3': '0.30em',
        'wide-4': '0.32em',
      },


      width: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '200vw': '200vw',
      },


      height: {
        '300px': '300px',
        '420px': '420px',
        '480px': '480px',
        '300vh': '300vh',
      },


      backdropBlur: {
        '6px': '6px',
      },


      transitionDuration: {
        '400': '400ms',
      },


      spacing: {
        '0.08em': '0.08em',
      },

    },
  },


  
  safelist: [
    'bg-[#121212]',
    'bg-[#121212]/70',
    'bg-[#2c2c2c]',
    'bg-[#75706f]/20',
    'bg-[#acaba9]/30',
    'bg-[#acaba9]/40',
    'bg-white/5',
    'border-white/5',
    'border-white/10',
    'text-[#75706f]',
    'text-[#acaba9]',
    'text-[#eaeaea]',
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
    'leading-[1.02]',
    'leading-[1.85]',
    'tracking-[0.18em]',
    'tracking-[0.28em]',
    'tracking-[0.3em]',
    'tracking-[0.32em]',
    'pl-[0.08em]',
    'h-[300px]',
    'h-[420px]',
    'h-[480px]',
    'h-[300vh]',
    'w-[300px]',
    'w-[420px]',
    'w-[480px]',
    'w-[200vw]',
    'left-[60%]',
    'top-[40%]',
    '-inset-[50%]',
    'backdrop-blur-[6px]',
    'duration-[400ms]',
    'hover:border-white/20',
    'hover:text-[#eaeaea]',
    'group-hover:text-[#acaba9]',
    'group-hover:text-white',
  ],

  plugins: [],
};
