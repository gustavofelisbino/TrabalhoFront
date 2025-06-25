# Decisão+ - Aplicação para Tomada de Decisões com Apoio de IA

---

## Descrição

Decisão+ é uma aplicação web que ajuda o usuário a tomar decisões mais informadas, comparando opções, visualizando prós e contras, e recebendo análise inteligente via OpenAI GPT. Conta com autenticação via Firebase, histórico de decisões, atalhos de teclado para navegação rápida e uma interface moderna construída com React e Material UI.

---

## Funcionalidades

- Cadastro e login de usuários com Firebase Authentication
- Criação de comparações entre várias opções
- Análise automática de decisões usando OpenAI GPT
- Histórico de comparações salvas no backend
- Navegação protegida com rotas públicas e privadas
- Atalhos globais de teclado para facilitar navegação
- Design responsivo e moderno com Material UI
- Lazy loading de páginas para melhor performance
- Sistema de notificações via Snackbar (notistack)

---

## Demo

> https://trabalho-front-teal.vercel.app/

---

## Tecnologias utilizadas

- React 18+ com Hooks
- React Router DOM (v6) para rotas
- Firebase Authentication para login e cadastro
- React Firebase Hooks para controle fácil do estado de autenticação
- Material UI (MUI) para UI e componentes
- Axios para comunicação HTTP com backend
- OpenAI API para análise de decisões via IA
- Notistack para notificações (toasts)
- React-tsparticles para efeitos visuais (opcional)
- Framer Motion para animações (opcional)
- Vite como bundler e dev server rápido

---

## Estrutura de pastas

<pre>
<span style="color:#22863a">/src</span>
 ├── <span style="color:#0366d6">components</span>       # Componentes reutilizáveis (Navbar, ThemeToggle, etc)
 ├── <span style="color:#0366d6">pages</span>            # Páginas do app (LoginCadastro, Home, Compare, History, Shortcuts)
 ├── <span style="color:#0366d6">services</span>         # Configurações de APIs (firebase, openai, api axios)
 ├── <span style="color:#0366d6">styles</span>           # Arquivos CSS / tema
 ├── <span style="color:#d73a49">main.jsx</span>         # Entrada da aplicação React
 └── <span style="color:#d73a49">App.jsx</span>          # Componente raiz com rotas
</pre>

## Instalação e Setup local

1. Clone o repositório:
   ```bash
   git clone https://github.com/gustavofelisbino/TrabalhoFront.git
   cd TrabalhoFront
   
2. Instale as dependências:

    ```bash
    npm install
    
3. Crie um arquivo .env na raiz com suas variáveis de ambiente:

    ```bash
    VITE_OPENAI_API_KEY=your_openai_api_key
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id

4. Rode a aplicação localmente:

    ```bash
    npm run dev

Acesse http://localhost:5173 no seu navegador.

## Uso

- Faça cadastro ou login
- Crie uma nova comparação com opções para analisar
- Aguarde a análise da IA com explicações e o melhor resultado
- Acompanhe seu histórico e utilize filtros para buscas rápidas
- Use atalhos de teclado (ex: Alt+N para comparar, Alt+H para histórico)

## Comandos úteis

    ```bash
    npm run dev — roda o servidor de desenvolvimento
    
    npm run build — gera build de produção na pasta dist
    
    npm run preview — preview local do build de produção

## Backend

Este projeto utiliza um backend simples para salvar comparações via API REST. A API deve estar rodando localmente em http://localhost:3001 (pode ser um backend Node/Express, JSON Server, etc).

A rota usada é:

POST /comparacoes
Com JSON no corpo contendo a comparação completa com análise.

## Personalização

- Modifique o tema MUI no arquivo /styles/theme.js

- Adicione ou modifique atalhos globais no componente KeyboardShortcuts em App.jsx

- Ajuste o prompt do OpenAI em /pages/Compare.jsx (ou componente equivalente)

- Altere configurações do Firebase em /services/firebase.js

## Dependências principais

- react
- react-dom
- react-router-dom
- @mui/material
- @mui/icons-material
- firebase
- react-firebase-hooks
- axios
- notistack
- react-tsparticles
- framer-motion

## Autor
Gustavo Felisbino - https://github.com/gustavofelisbino

## Créditos
- Logo e design inspirado por Material UI
- Análise inteligente via OpenAI GPT API
- Autenticação com Firebase
- Base do projeto com Vite

## Obrigado por usar Decisão+! 🚀
