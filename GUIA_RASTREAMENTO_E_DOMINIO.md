# Guia rápido: rastreamento e domínio

Este arquivo registra os passos que deverão ser revisados quando as ferramentas de rastreamento forem instaladas e quando o domínio provisório da Vercel for substituído pelo domínio definitivo.

## 1. Depois de instalar rastreamento

Quando forem adicionados Google Analytics, Google Tag Manager, Meta Pixel ou outra ferramenta semelhante, o site deverá ter uma camada de consentimento antes de carregar scripts não essenciais.

A implementação deverá incluir um banner ou painel de preferências, uma forma de aceitar ou recusar rastreamento e o armazenamento da escolha do visitante em cookie ou `localStorage`. O script de analytics deve ser carregado somente depois da autorização, conforme a política definida para o site.

Arquivos que provavelmente serão criados ou alterados:

| Arquivo ou área | Função |
|---|---|
| `components/CookieConsent.jsx` | Banner e preferências de consentimento. |
| `app/layout.jsx` | Ponto global para metadata, consentimento e carregamento controlado dos scripts. |
| `public/robots.txt` | Manter o rastreamento permitido conforme a política do site. |
| `public/llms.txt` | Atualizar somente se os canais oficiais ou informações institucionais mudarem. |
| Política de privacidade | Criar ou atualizar antes de ativar ferramentas de rastreio. |
| Política de cookies | Criar se forem usados cookies de analytics, publicidade ou preferências. |

Não adicionar `sw.js` apenas por causa do rastreamento. Service Worker tem função de cache/offline e é independente de cookies de analytics.

## 2. Domínio atual provisório

Enquanto o domínio definitivo não estiver configurado, os arquivos públicos e os metadados usam:

```text
https://vidracariamontabox.vercel.app/
```

Esse domínio aparece atualmente em:

```text
app/layout.jsx
public/llms.txt
public/robots.txt
public/sitemap.xml
```

## 3. Quando o domínio definitivo estiver pronto

Substituir o domínio provisório pelo domínio oficial nos seguintes pontos:

| Arquivo | O que revisar |
|---|---|
| `app/layout.jsx` | `metadataBase`, canonical, URL do Open Graph, imagens sociais e qualquer URL absoluta. |
| `public/robots.txt` | URL da linha `Sitemap`. |
| `public/sitemap.xml` | Todas as URLs dentro de `<loc>`. |
| `public/llms.txt` | Página principal, sitemap e links institucionais absolutos. |
| Componentes | Links absolutos para Instagram, WhatsApp, Maps ou outros canais, se houver mudança. |
| Vercel | Domínio principal, aliases e redirecionamento do domínio antigo. |
| Ferramentas de rastreamento | URL/propriedade cadastrada no Analytics, Tag Manager, Search Console e Pixel. |

No Next.js, URLs relativas como `/icon.png` e `/images/...` normalmente não precisam ser alteradas. O `metadataBase` resolve as URLs relativas para o domínio definido.

## 4. Checklist antes do deploy definitivo

Verificar se o domínio abre com HTTPS, se o canonical aponta para a URL correta, se as tags Open Graph mostram o endereço definitivo, se `robots.txt` está acessível, se `sitemap.xml` está acessível e se não há referências restantes ao domínio provisório.

Depois do deploy, testar a página com Lighthouse, PageSpeed Insights, Search Console e uma ferramenta de validação de Open Graph. Também verificar se o consentimento bloqueia os scripts de rastreamento antes da autorização.

## 5. Situação atual

No momento, não há rastreador instalado neste projeto. O domínio provisório da Vercel está sendo usado apenas como endereço canônico temporário. Este documento é um guia de revisão futura e não instala cookies, analytics ou scripts de terceiros.
