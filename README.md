# Ética em Jogo 🎲⚖️
**Versão 2.0 — Protótipo Digital**

Jogo de tabuleiro digital sobre Ética e Deontologia de Enfermagem.
Desenvolvido para ser jogado em ecrã partilhado (projetor/TV) por equipas.

---

## 🚀 Colocar online — GitHub Pages

### 1. Editar `package.json`
Substituir `SEU_UTILIZADOR` pelo teu nome de utilizador do GitHub:
```json
"homepage": "https://SEU_UTILIZADOR.github.io/etica-em-jogo"
```

### 2. Criar repositório no GitHub
- github.com → **New repository** → nome: `etica-em-jogo` → **Public**

### 3. Instalar e fazer deploy
```bash
npm install
npm run deploy
```

O jogo fica disponível em:
`https://SEU_UTILIZADOR.github.io/etica-em-jogo`

---

## 💻 Testar localmente
```bash
npm install
npm start
```
Abre em `http://localhost:3000`

---

## 📁 Estrutura
```
src/
├── App.jsx                    # Raiz
├── index.js                   # Entrada
├── data.js                    # ← EDITAR AQUI (cartas e tabuleiro)
├── utils.js                   # Cores e funções
└── components/
    ├── SetupScreen.jsx        # Configuração inicial
    ├── GameScreen.jsx         # Jogo principal
    ├── Board.jsx              # Tabuleiro SVG
    └── CardVisual.jsx         # Componente de carta
```

---

## ✏️ Adicionar cartas

Abre `src/data.js` e adiciona ao array `PAIRS`:

```js
{
  d: {
    texto: 'Descrição do dilema...',
    pergunta: 'O que fazes?',
  },
  r: {
    perguntas: [
      'Pergunta de reflexão 1?',
      'Pergunta de reflexão 2?',
    ],
  },
},
```

Para **SABIAS QUE**, adiciona ao array `SABIAS`:
```js
{
  texto: 'Facto ou norma...',
  fonte: 'Fonte — Lei/Norma/Artigo',
},
```

---

## 🎮 Mecânica

| Casa | Acção |
|------|-------|
| **DILEMA** | Carta DILEMA; temporizador inicia automaticamente |
| **SABIAS QUE** | Carta SABIAS QUE; equipa avança 1 casa |
| **ESTIVE A PENSAR / O QUE ACHAS?** | Abre directamente o verso REFLETE |
| **NINGUÉM VIU! / NÃO ME INTERESSA!** | Casa DILEMA com nome especial |
| **Casa 5 → 11** | 🪜 Escada — equipa sobe |
| **Casa 10 → 14** | 🪜 Escada — equipa sobe |
| **Casa 11 → 3** | 🎿 Escorregador — equipa desce |
| **Casa 15 → 7** | 🎿 Escorregador — equipa desce |

**Não há respostas certas. O objetivo é a discussão.**

---

*Desenvolvido com ❤️ para promover a reflexão ética em enfermagem*
