# Subhiksha | Aspiring Software Developer Portfolio

A modern, responsive, developer-focused portfolio website for **Subhiksha**, a 3rd-year B.Tech Electronics and Communication Engineering student at Sri Manakula Vinayagar Engineering College (SMVEC) aspiring to become a Software Developer / Web Developer.

Designed and engineered with clean typography, responsive layout, dark/light theme persistence, interactive case study simulations, verified academic timeline, dynamic certificates showcase, resume viewer & download, and an Express API backend with input validation.

---

## 🚀 Features

- **Developer Hero Section**: Personalized headline, unboxed metadata, interactive live Python code console with execution simulation, direct GitHub and LinkedIn links.
- **About Me**: Transparent narrative bridging ECE analytical foundations with software craftsmanship and practical problem solving.
- **Skills Categorization**: Clear honest skill levels (`Learning`, `Familiar`, `Intermediate` — no unrealistic 95% progress bars) with interactive category filter tabs (Programming, Web Development, Databases, Tools).
- **Featured Projects & Live Interactive Sandboxes**:
  - **Student Management System** (Python, SQL, CRUD): Includes an in-browser live CRUD simulator with SQL insert, search, deletion, and GPA aggregation.
  - **Food Ordering & Delivery Website** (HTML, CSS, JavaScript): Real-time cart calculation, quantity modifier, and animated order tracking milestone simulator.
  - **IoT Medication Reminder Wristband** (ESP8266, RTC DS3231, Web UI): Simulated OLED display hardware with alarm trigger and caregiver adherence logging feed.
- **Deep-Dive Case Study Modals**: Problem statement, objective, core features, architecture, challenges solved, and future improvements for every project.
- **Academic Timeline**: 3rd-year B.Tech ECE at SMVEC alongside 12th (81.5%) and 10th (82.2%) academic scores.
- **Certificates & Workshops**: Dynamic certificates showcase with credential preview modal.
- **Resume Section & In-App Viewer**: Embedded printable A4 resume viewer modal, print/PDF button, and direct download linking to `/public/resume.pdf`.
- **Backend API & Contact System**: Server-side `/api/contact` Express endpoint with input validation, duplicate prevention, and mailto fallback.
- **Dark / Light Theme Toggle**: Persistent theme preference stored in `localStorage`.
- **SEO & Structured Data**: Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`), OpenGraph tags, and Schema.org `Person` JSON-LD data.

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons
- **Backend / API**: Node.js, Express, TSX
- **Build & Bundling**: Vite 8
- **Design System**: Plus Jakarta Sans, JetBrains Mono

---

## 📂 Project Structure

```
├── .env.example              # Environment variables template
├── index.html                # Entry HTML with SEO metadata & JSON-LD
├── metadata.json             # AI Studio applet metadata
├── package.json              # Dependencies and scripts
├── public/
│   └── resume.pdf            # Replaceable resume document
├── server.ts                 # Fullstack Express API & Vite dev server
├── src/
│   ├── assets/               # Generated high-resolution project images
│   ├── components/
│   │   ├── About.tsx         # About narrative and profile card
│   │   ├── Certificates.tsx  # Dynamic certificates showcase
│   │   ├── Contact.tsx       # Contact form with validation
│   │   ├── Education.tsx     # Academic timeline
│   │   ├── Footer.tsx        # Footer with back-to-top button
│   │   ├── Hero.tsx          # Hero with interactive Python terminal
│   │   ├── InteractiveProjectDemoModal.tsx # In-browser project simulators
│   │   ├── Navbar.tsx        # Sticky responsive navbar with theme toggle
│   │   ├── ProjectDetailsModal.tsx # Technical case studies
│   │   ├── Projects.tsx      # Filterable project cards
│   │   ├── ResumeModal.tsx   # Printable A4 resume viewer
│   │   └── ResumeSection.tsx # Resume download and view controls
│   ├── context/
│   │   └── ThemeContext.tsx  # Dark/light theme state with localStorage
│   ├── data/
│   │   └── portfolioData.ts  # Central configuration file for content
│   ├── services/
│   │   └── contactService.ts # API transmission service
│   ├── App.tsx               # Root application component
│   ├── index.css             # Tailwind base and custom scrollbar
│   └── main.tsx              # React DOM entry point
└── tsconfig.json             # TypeScript compiler settings
```

---

## 💻 Local Setup & Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dsubhikshadurai-create/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**:
   ```bash
   cp .env.example .env
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Start production server**:
   ```bash
   npm run start
   ```

---

## 📝 How to Update Content

All website content is cleanly centralized in a single configuration file:
👉 **`src/data/portfolioData.ts`**

### 1. Adding a New Project
In `src/data/portfolioData.ts`, add an object to the `projects` array:
```typescript
{
  id: 'my-new-app',
  title: 'My New Application',
  tagline: 'Short one-line description',
  category: 'Software', // 'Software' | 'Web' | 'IoT'
  description: 'Detailed description of what the project does.',
  technologies: ['Python', 'FastAPI', 'React'],
  image: '/src/assets/images/my_project_screenshot.jpg',
  githubUrl: 'https://github.com/dsubhikshadurai-create/my-new-app',
  problemStatement: '...',
  objective: '...',
  features: ['Feature 1', 'Feature 2'],
  architecture: ['Architecture 1'],
  howItWorks: ['Step 1', 'Step 2'],
  challenges: ['Challenge 1'],
  futureImprovements: ['Improvement 1'],
  interactiveDemoType: 'student-crud'
}
```

### 2. Updating Your Resume PDF
To replace the resume:
1. Place your updated PDF file in the `public/` folder with the name `resume.pdf` (`/public/resume.pdf`).
2. The website will automatically serve the updated PDF on both the **View Resume** and **Download Resume** buttons without requiring any code modifications!

### 3. Adding or Updating Certificates
Add an entry to the `certificates` array in `src/data/portfolioData.ts`:
```typescript
{
  id: 'cert-new',
  title: 'Cloud & DevOps Foundations',
  issuer: 'NPTEL / Coursera',
  issueDate: '2026',
  credentialId: 'CRED-2026-99',
  skillsLearned: ['Docker', 'CI/CD', 'Linux'],
  image: '/src/assets/images/certificate_badge.jpg',
}
```

---

## 📬 Contact Form & Webhook Forwarding

The contact form is hooked into `POST /api/contact` on the Express backend.

- To receive immediate push notifications (e.g. to Discord, Slack, Zapier, or Resend), set `CONTACT_WEBHOOK_URL` in `.env`:
  ```env
  CONTACT_WEBHOOK_URL="https://hooks.slack.com/services/..."
  ```
- If deployed to a static host (e.g. GitHub Pages or Vercel static), the form automatically logs entries locally and offers visitors a pre-filled default mailto fallback!

---

## 🌐 Deployment Instructions

### Deploying to Cloud Run / Node.js Host
1. Run `npm run build`
2. Run `npm run start`

### Deploying to Vercel / Netlify
1. Connect the GitHub repository.
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 📄 License & Credits

Created by **Subhiksha** · B.Tech ECE (SMVEC)
© 2026 Subhiksha. All rights reserved.
