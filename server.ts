import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory inquiry store for incoming contact submissions
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  createdAt: string;
}

const contactInbox: ContactMessage[] = [];

// Contact form submission endpoint
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
      return res.status(400).json({ error: 'Subject must be at least 3 characters long.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
    }

    const inquiryId = `MSG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newInquiry: ContactMessage = {
      id: inquiryId,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      ip: req.ip || req.headers['x-forwarded-for'] as string,
      createdAt: new Date().toISOString(),
    };

    contactInbox.unshift(newInquiry);
    if (contactInbox.length > 100) contactInbox.pop();

    console.log(`[Contact Form Received] ID: ${inquiryId} | From: ${name} (${email}) | Subject: ${subject}`);

    // If an external webhook or email forwarder is configured in environment variables:
    if (process.env.CONTACT_WEBHOOK_URL) {
      try {
        await fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newInquiry),
        });
      } catch (webhookErr) {
        console.warn('Webhook notification delivery failed:', webhookErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received and logged. Subhiksha will get back to you promptly.',
      inquiryId,
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({ error: 'Internal server error while processing message.' });
  }
});

// Explicit endpoint to serve /resume.pdf with proper headers for both viewing and downloading
app.get('/resume.pdf', (req: Request, res: Response) => {
  const resumePath = path.resolve(__dirname, 'public', 'resume.pdf');
  if (fs.existsSync(resumePath)) {
    const isDownload = req.query.download === '1' || req.query.download === 'true';
    if (isDownload) {
      return res.download(resumePath, 'Subhiksha-Resume.pdf');
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="Subhiksha-Resume.pdf"');
    return res.sendFile(resumePath);
  } else {
    return res.status(404).send(
      'Resume file not found. Please upload your actual resume PDF to /public/resume.pdf.'
    );
  }
});

// Serve public directory assets (certificates, resume, etc.) at root and /public
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    developer: 'Subhiksha',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Server bootstrap
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve production static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    // Mount Vite dev middleware in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Startup failed:', err);
});
