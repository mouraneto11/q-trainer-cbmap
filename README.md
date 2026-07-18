# Q-Trainer CBMAP 🚑🚒

**Aplicativo PWA de Treinamento do Código Q**
Desenvolvido para o **5º Pelotão de Atendimento Pré-Hospitalar (APH)** do Curso de Formação de Soldados (CFSD 2026.2) do Corpo de Bombeiros Militar do Amapá (CBMAP).

Este aplicativo foi criado para ajudar os alunos a memorizarem e treinarem a comunicação via rádio utilizando o Código Q, de forma rápida, eficiente e acessível em qualquer lugar, mesmo sem internet.

---

## 📱 Funcionalidades

O Q-Trainer é um **Progressive Web App (PWA)** "Mobile First", o que significa que ele se comporta como um aplicativo nativo no celular:
- **Instalável:** Pode ser adicionado à tela inicial do smartphone.
- **100% Offline:** Após o primeiro acesso, o aplicativo funciona perfeitamente sem necessidade de conexão com a internet, ideal para uso em áreas remotas ou durante instruções no quartel.

O app é dividido em três abas principais:

### 📖 Dicionário
- Lista completa de 42 Códigos Q utilizados na comunicação militar e de emergência.
- Barra de pesquisa em tempo real, permitindo buscar tanto pelo código (ex: `QSL`) quanto pelo significado (ex: `Entendido`).
- Ao clicar em um código, um modal exibe um **exemplo prático de uso no rádio**.

### 🃏 Flashcards
- Modo de estudo ativo utilizando cartões de memorização com animação 3D.
- Ao tocar no cartão, ele vira para revelar a resposta.
- Suporta dois modos de treino:
  - **Código → Significado** (ex: Lê-se "QTH", tenta lembrar "Localização").
  - **Significado → Código** (ex: Lê-se "Cancelado", tenta lembrar "QTA").
- Navegação por botões ou deslizando o dedo (swipe) para os lados.
- Opção de embaralhar o deck de cartas.

### 🎯 Simulado
- Teste seus conhecimentos com perguntas de múltipla escolha geradas aleatoriamente.
- Intercala perguntas pedindo o significado de um código e perguntas pedindo o código para um significado.
- Feedback imediato informando se a resposta está correta ou incorreta.
- Placar de pontuação em tempo real com contagem de acertos, erros e percentual.

---

## 🎨 Design e Identidade Visual

O design foi cuidadosamente elaborado para refletir a identidade do **5º Pelotão APH**:
- **Cores Oficiais:** Baseado na flâmula do pelotão, utiliza o **Azul Escuro** como fundo principal e o **Branco** para forte contraste e legibilidade, além de toques de vermelho.
- **Acessibilidade:** Botões grandes e fáceis de tocar, pensando no uso rápido entre instruções.
- **Interface Limpa:** Ausência de elementos desnecessários ou gradientes exagerados, mantendo um visual sério, militar e padrão.

---

## 🚀 Como Executar o Projeto

Este projeto foi construído utilizando tecnologias web puras (**HTML5, CSS3 e Vanilla JS**), sem depender de frameworks pesados ou bibliotecas externas.

### Hospedagem no GitHub Pages (Recomendado)
Para publicar este projeto no GitHub Pages, basta subir os arquivos para um repositório no GitHub e ativar o GitHub Pages nas configurações apontando para a *branch* `main` e pasta `/root`. O PWA funcionará automaticamente, pois já possui HTTPS.

### Executando Localmente
Como o projeto utiliza um Service Worker para funcionar offline, ele **precisa ser servido por um servidor HTTP** (não funciona abrindo o arquivo `index.html` diretamente no navegador com `file://`).

Você pode rodar localmente de diversas formas:

1. **Usando o script incluso (Windows):**
   Basta dar um duplo clique no arquivo `rodar-local.bat`. Ele tentará iniciar um servidor usando Node.js ou Python, caso estejam instalados.

2. **Usando Node.js:**
   ```bash
   npx serve . -p 3000
   ```
   Acesse: `http://localhost:3000`

3. **Usando Python:**
   ```bash
   python -m http.server 8080
   ```
   Acesse: `http://localhost:8080`

4. **Usando VS Code:**
   Instale a extensão "Live Server" e clique em "Go Live" na barra inferior.

---

## 🗂️ Estrutura de Arquivos

- `index.html`: Estrutura principal da página (Single Page Application).
- `style.css`: Estilização completa do projeto.
- `app.js`: Lógica da aplicação, banco de dados dos Códigos Q, manipulação do DOM e registro do Service Worker.
- `manifest.json`: Arquivo de configuração do PWA (ícones, cores, nome do app).
- `sw.js`: Service Worker responsável por fazer o cache dos arquivos e garantir o funcionamento offline.
- `rodar-local.bat`: Script auxiliar para iniciar um servidor local facilmente.
- `icons/`: Pasta (virtual, os ícones são gerados por canvas no código ou devem ser adicionados na raiz) para os ícones do PWA.

---

**Desenvolvido para o CFSD 2026.2 - CBMAP** 🚒
*"Vidas Alheias e Riquezas Salvar!"*
