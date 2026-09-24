# 🐷⚡ Leitão IA

Assistente de chat para tirar dúvidas de programação, com a personalidade de
um tech lead sênior meio doidão: direto, engraçado e didático, ensinando com
analogias malucas sem perder a precisão técnica.

Projeto acadêmico desenvolvido para apresentação em aula.

## Sobre o projeto

Quem está aprendendo ou trabalhando com programação frequentemente trava em
dúvidas do dia a dia — um erro de código, uma dúvida de sintaxe, uma decisão
simples de como fazer algo — e nem sempre tem alguém por perto pra perguntar
na hora. A **Leitão IA** resolve isso sendo uma assistente de bate-papo
sempre disponível, que tira dúvidas de programação na hora, pra devs de
qualquer nível.

O chat roda inteiramente no navegador (frontend em React) e usa a API do
**Google Gemini** para gerar as respostas. A personalidade do "Leitão" é
definida por um *system prompt* que instrui o modelo a responder em
português, de forma curta, bem-humorada e didática — zoando gambiarras com
carinho antes de corrigi-las.

## Funcionalidades

- 💬 **Chat com IA** — conversa em português com o Leitão IA, powered by
  `gemini-2.5-flash`.
- 🗂️ **Gerenciamento de conversas** — múltiplas conversas independentes,
  cada uma salva no `localStorage` do navegador:
  - Criar uma nova conversa a qualquer momento.
  - Alternar entre conversas antigas pela barra lateral (histórico).
  - Excluir conversas que não interessam mais.
  - Título gerado automaticamente a partir da primeira pergunta.
- 🧠 **Contexto de conversa** — o histórico de cada conversa é reenviado
  pra API a cada mensagem (limitado às últimas mensagens, pra não estourar
  o contexto), então o Leitão "lembra" do que foi dito antes.
- 🎨 **Interface neubrutalista** — visual escuro, colorido e caótico,
  condizente com a personalidade da IA.
- ℹ️ **Página "Sobre"** — explica o projeto e quem criou.

## Tecnologias usadas

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) para navegação entre páginas
- [Tailwind CSS 4](https://tailwindcss.com/) para estilização
- [`@google/genai`](https://www.npmjs.com/package/@google/genai) — SDK
  oficial do Google para consumir a API do Gemini
- `localStorage` do navegador para persistir o histórico de conversas

## Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Uma **API key do Google Gemini** (gratuita) — veja como conseguir abaixo

### Passo a passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/loidrodrigues/IA-Code-Assistent.git
   cd IA-Code-Assistent
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure sua API key: copie o arquivo `.env.example` para `.env` e
   cole sua chave:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_GEMINI_API_KEY=sua_api_key_aqui
   ```

4. Rode o projeto em modo desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra `http://localhost:5173` no navegador.

### Como conseguir a API key do Gemini

1. Acesse [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Faça login com uma conta Google.
3. Clique em "Create API key" e copie a chave gerada.
4. Cole no `.env` como mostrado acima.

A camada gratuita da API é suficiente para uso e apresentação do projeto.

## Estrutura do projeto

```
src/
├── App.jsx              # Rotas da aplicação
├── pages/
│   ├── Home.jsx          # Página inicial (landing page)
│   ├── Dashboard.jsx      # Tela do chat com o Leitão IA
│   └── Sobre.jsx          # Página "Sobre" o projeto e o criador
├── components/
│   ├── hero67.jsx         # Seção principal da Home
│   └── ui/                # Componentes de interface reutilizáveis
└── index.css              # Estilos globais e tema
```

## Autor

Desenvolvido por **Loid Rodrigues**.
