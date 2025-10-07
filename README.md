# Movie Store - Loja de Filmes

Uma aplicação moderna de e-commerce para filmes, desenvolvida em React com integração à API do TMDB para exibição e busca de filmes.

## 📋 Sobre o Projeto

Esta é uma loja virtual de filmes que permite aos usuários:

- Explorar catálogo de filmes populares
- Buscar filmes por título
- Adicionar/remover filmes do carrinho
- Gerenciar lista de favoritos
- Finalizar compra com formulário validado

## 🚀 Tecnologias Utilizadas

- **React** 19.1.1
- **Vite** 7.1.7
- **Tailwind CSS** 4.1.14
- **React Router DOM** 7.9.3
- **Lucide React** (Ícones)
- **React Hot Toast** (Notificações)

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm
- Chave de API do TMDB

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/beatrizdaddea/movie-store.git
cd movie-store
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API TMDB:

```env
VITE_TMDB_API_KEY=sua_chave_api_aqui
```

**📚 Como obter a API Key do TMDB:**

1. Acesse [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
2. Crie uma conta ou faça login
3. Vá para configurações da API
4. Solicite uma API Key
5. Use a chave gerada no arquivo `.env`

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🛠 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa ESLint para análise de código

## 🎯 Funcionalidades

### Principais

- **Catálogo de Filmes**: Listagem de filmes populares da API TMDB
- **Busca em Tempo Real**: Pesquisa de filmes por título
- **Carrinho de Compras**:
  - Adicionar/remover filmes
  - Quantidade total visível
  - Sidebar interativo
- **Checkout Completo**:
  - Formulário com validação
  - Máscaras para campos (email, celular, CEP, CPF)
  - Modal de confirmação de compra

### Adicionais

- **Lista de Favoritos**: Adicionar/remover filmes dos favoritos
- **Design Responsivo**: Otimizado para mobile e desktop
- **Animações**: Interface fluida e interativa

## 🔐 Variáveis de Ambiente

| Variável            | Descrição            | Obrigatório |
| ------------------- | -------------------- | ----------- |
| `VITE_TMDB_API_KEY` | Chave de API do TMDB | ✅          |

## 📱 Responsividade

A aplicação foi desenvolvida com foco em mobile-first, garantindo uma experiência otimizada em todos os dispositivos.

## 🤝 Considerações do Desenvolvimento

- Utilização de React Hooks para gerenciamento de estado
- Componentização para reutilização de código
- Integração fluida com a API TMDB
- Interface intuitiva e moderna
- Performance otimizada com Vite

---

## 👩‍💻 Autora

**Beatriz Chieffi**  
Desenvolvedora de Software

📧 **Email:** beatrizchit@gmail.com  
🔗 **LinkedIn:** [Beatriz Chieffi](www.linkedin.com/in/beatriz-daddea)  
🔗 **GitHub:** [Beatriz Daddea]([www.linkedin.com/in/beatriz-daddea](https://github.com/beatrizdaddea))

---
