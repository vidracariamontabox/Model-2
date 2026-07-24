# Tecnologias do Projeto

Este projeto e um site em Next.js para a Montabox. A interface e composta por componentes React, com animacoes de scroll e interacao, estilizada principalmente com Tailwind CSS.

## Producao

### Framework e interface

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| Next.js | `16.2.9` | Framework principal, renderizacao e estrutura da aplicacao. |
| React | `18.3.1` | Biblioteca para construcao dos componentes da interface. |
| React DOM | `18.3.1` | Renderizacao do React no navegador. |

### Animacao e interacao

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| Framer Motion | `12.41.0` | Animacoes declarativas, transicoes, hover e animacoes ligadas ao scroll. |
| GSAP | `3.15.0` | Animacoes de texto e controle de timelines. |
| @gsap/react | `2.1.2` | Integracao do GSAP com o ciclo de vida dos componentes React. |
| Lenis | `1.3.25` | Rolagem suave da pagina. |

### Componentes visuais

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| Swiper | `14.0.1` | Carrosseis e conteudos deslizaveis. |
| @splinetool/react-spline | `4.1.0` | Integracao de cenas e elementos 3D do Spline com React. |
| @splinetool/runtime | `1.12.98` | Runtime necessario para executar os recursos 3D do Spline. |

## Desenvolvimento e Build

| Tecnologia | Versao | Uso |
| --- | --- | --- |
| Tailwind CSS | `3.4.17` | Estilizacao utilitaria, tema, paleta, tipografia e responsividade. |
| PostCSS | `8.5.6` | Processamento do CSS durante o build. |
| Autoprefixer | `10.4.21` | Adiciona prefixos CSS para compatibilidade entre navegadores. |

### Estilos locais

- CSS global e arquivos CSS por area da interface, como `app/globals.css`, `app/Testimonials.css` e `app/testimonials-ui.css`.
- Fontes locais carregadas pelo `next/font/local`, incluindo Familjen Grotesk, Neue Haas Display e Ivy Presto Display.
- Fonte Archivo carregada pelo `next/font/google`.

### Scripts disponiveis

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia o ambiente local de desenvolvimento com Next.js. |
| `npm run build` | Gera a versao otimizada de producao. |
| `npm run start` | Inicia a aplicacao gerada pelo build de producao. |

> Observacao: atualmente o `package.json` nao possui uma secao `devDependencies`. Tailwind CSS, PostCSS e Autoprefixer estao listados em `dependencies`, mas exercem papel de ferramentas de desenvolvimento e build.
