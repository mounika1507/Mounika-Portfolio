# Portfolio (React + Vite)

This is a minimal, professional portfolio scaffold built with React and Vite.

## Quick start

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Start dev server:

   ```powershell
   npm run dev
   ```

3. Open the URL printed by Vite (usually http://localhost:5173)

## Project structure

- `index.html` — app entry
- `src/main.jsx` — React entry
- `src/App.jsx` — main App component
- `src/components/*` — Header, Hero, About, Projects, Contact, Footer, ProjectCard
- `src/styles.css` — global styles

## Next steps / customization

- Replace placeholder content and projects with your info
- Add images in an `assets/` folder and import them in components
- Hook up the contact form to an email service or backend
- Deploy to Netlify / Vercel / GitHub Pages

## Chatbot

This project includes a simple client-side chatbot that answers questions based on a small FAQ dataset.

- The chatbot component is at `src/components/Chatbot.jsx`.
- The FAQ items (question/answer pairs) are in `src/data/faqs.js`. Edit that file to add or change answers.
- The chat history is stored locally in `localStorage` and can be cleared from the chat UI.

This chatbot is rule-based (keyword matching). If you want a more advanced assistant, I can integrate an external API (OpenAI, Azure, etc.) — tell me which provider you prefer and I will add server-side wiring and example env configuration.

Server-backed training (make chatbot global)
-----------------------------------------

Currently the chatbot stores taught Q/A locally in the browser. To make training global (so that taught Q/A are available to all visitors) the project includes a minimal Node server you can deploy.

- Server location: `server/` (Express + lowdb). It exposes:
   - `GET /faqs` — returns all dynamic FAQs (JSON)
   - `POST /faqs` — add a new FAQ (body: `{ question, answer }`)

How to run the server locally

1. Open a terminal in the `server/` folder and install deps:

```powershell
cd /d "c:\Users\mouni\OneDrive\Desktop\P\server"
npm install
npm start
```

The server will listen on port 7777 by default.

How to make the site use the server (so chat training is global)

1. Deploy the `server/` to any Node hosting (Render, Fly, Railway, or a VPS). Example: Render (Web Service) with `npm start`.
2. Once the server is deployed, set an environment variable for the frontend: `VITE_API_URL` to the server base URL (for example `https://your-server.onrender.com`).
3. Start the frontend dev server with that env var (Vite picks up `VITE_` env vars):

```powershell
# Windows PowerShell example
$env:VITE_API_URL = 'https://your-server.example'
npm run dev
```

When `VITE_API_URL` is set, the chatbot will fetch dynamic FAQs from the server and POST new taught Q/A there, making training available to all visitors.

If you want, I can:

- Add a small export/import button so you can export taught Q/A to a JSON file and merge them into `src/data/faqs.js`.
- Configure a production deploy (Render or Vercel) with a step-by-step guide and required environment variables.

If you want, I can now:
- personalize content (your name, bio, projects),
- add animations or a theme switcher, or
- create a deployment config for Vercel/Netlify.
