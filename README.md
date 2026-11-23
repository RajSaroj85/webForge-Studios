# WebForge Studio

**Forge Ideas. Build Digital Experiences.**

WebForge Studio is a modern, responsive developer portfolio website built to showcase projects, technical skills, professional experience, services, and contact information.

The project uses React and TypeScript for the frontend, Supabase for backend services and PostgreSQL database management, and Vercel for deployment.

## 🚀 Live Website

**Website:** https://code-forge-studios.vercel.app/

## ✨ Features

- Modern and responsive portfolio design
- Professional profile and introduction
- Technical skills and technology stack
- Featured projects with GitHub and live links
- Professional experience and achievements
- Services and client testimonials
- Contact form for project inquiries
- Supabase authentication integration
- PostgreSQL database integration
- Admin dashboard for portfolio management
- Responsive desktop and mobile layouts

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Backend services and authentication |
| PostgreSQL | Database |
| Vite | Development and build tool |
| Vercel | Hosting and deployment |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
WebForge-Studio/
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── lib/
│   ├── services/
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project folder

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

Add the following variables:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Replace the placeholder values with your own Supabase project URL and publishable key.

**Important:** Never add your Supabase secret key, database password, or other private credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal.

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## ☁️ Deployment

This project is deployed using **Vercel**.

### Deploy using GitHub

1. Push your latest code to GitHub.
2. Sign in to Vercel.
3. Import your GitHub repository.
4. Configure the environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Use the Vite build command:

```bash
npm run build
```

6. Set the output directory to:

```text
dist
```

7. Click Deploy.

Vercel can automatically deploy future changes whenever you push updates to the connected GitHub repository.

## 🔐 Security

- Supabase Authentication is used for user authentication.
- Database access should be protected using Row Level Security (RLS).
- Admin privileges should be validated on the server/database side.
- Never expose secret keys or private credentials in frontend code.
- Public users should only receive the database permissions required for public website functionality.

## 👨‍💻 Developer

**Raj Saroj**

Java Full Stack Developer | React Developer

- GitHub: https://github.com/Rajsaroj85/
- Instagram: https://www.instagram.com/web_forgestudios/

## 📄 License

This project is maintained by Raj Saroj. All rights reserved unless otherwise specified.

---

**WebForge Studio — Turning Ideas Into Digital Experiences.**
