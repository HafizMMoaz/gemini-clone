# 🔮 Gemini Clone – React + Vite

A clean and functional clone of Google Gemini built using **React**, **Vite**, and the **Google Gemini API**.  
It features a two-pane layout with a sidebar storing recent prompts, a main chat window supporting new chats, and the ability to generate code from prompts.

---

## 📁 Folder Structure

```bash
gemini-clone/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/            # Icons and image assets
│   ├── components/
│   │   ├── Main/          # Main chat interface
│   │   └── SideBar/       # Sidebar with recent prompts & new chat
│   ├── config/            # Gemini API config and markdown parser
│   ├── context/           # React context for global state
│   ├── App.jsx            # Root component
│   ├── index.css
│   └── main.jsx           # App entry point
├── .gitignore
├── .env                   # Environment variables (not committed)
├── eslint.config.js
├  ── index.html
├── package.json
├── vite.config.js
└── README.md
```


---

## 🚀 Features

- Gemini API integration using `VITE_GEMINI_API_KEY` stored in `.env`
- Responsive UI with sidebar and main chat window
- Stores recent prompts and displays them in sidebar
- "New Chat" functionality to clear current conversation
- Supports generating code snippets and markdown-rendered responses
- State managed globally with React Context API

---

## ⚙️ Getting Started

1. Clone the repo

```bash
git clone https://github.com/HafizMMoaz/gemini-clone.git
cd gemini-clone
```

2. Install dependencies

```bash
npm install
```

3. Create .env file and add your API key

```bash
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
    Note: Do not commit this file to source control.

4. Run development server

```bash
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 🧠 How It Works

- The app connects to Google Gemini API using the key stored in `.env`.
- Recent prompts are saved in `memory` and displayed in the sidebar.
- New chats clear previous messages for fresh conversations.
- Responses from Gemini are parsed and displayed as markdown (including code blocks).
- Uses React Context API for global state management of messages and prompts.

---

## 🧪 Developer Notes

- **Main Chat UI:** `src/components/Main/Main.jsx`
- **Sidebar & Prompt History:** `src/components/SideBar/SideBar.jsx`
- **Global State:** `src/context/Context.jsx`
- **Prompt Input:** `src/components/Main/PromptInput.jsx`
- **Markdown Parsing:** `src/config/marked.js`
- **Assets:** Stored in `src/assets/`

---

## 🛠 Future Improvements

- Dark/Light mode toggle
- Save and export full chat histories
- User authentication and syncing prompts across devices
- Support switching between Gemini and OpenAI APIs
- Enhanced error handling and loading states

