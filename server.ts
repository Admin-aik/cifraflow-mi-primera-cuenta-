import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Financial Advisor Endpoint
  app.post('/api/ai/advisor', async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const ai = getAi();
      if (!ai) {
        return res.status(503).json({ 
          error: 'AI is not configured with GEMINI_API_KEY, relying on local financial engine.' 
        });
      }

      const systemInstruction = `Eres "CifraBot FinTech", el Asesor Financiero e Inteligencia Artificial del juego educativo "Cifraflow: Abriendo Mi Primera Cuenta de Banco".
Tu objetivo es educar a adolescentes y jóvenes sobre el sistema bancario de Venezuela, regulaciones de SUDEBAN, el SENIAT (RIF), el Banco Central de Venezuela (BCV), PagoMóvil P2P y C2P, biometría Biopago, y los 3 bancos clave:
1. Banco de Venezuela (0102): Cuentas digitales BDV, BDVkids/Juvenil, BDVApp, PagoMóvil.
2. Banco Plaza (0138): Tu Cuenta Plaza, Cuenta Verde en divisas a tasa oficial BCV, apoyo a emprendedores.
3. Banco del Tesoro (0163): Cuentas de ahorro social, inclusión comunitaria, Tesoro En Línea.

Instrucciones de respuesta:
- Habla en español dinámico, fresco, motivador y con tono gamer/futurista Cyber-Space.
- Responde de forma concisa (máximo 2 párrafos), precisa y con explicaciones prácticas.
- Enfatiza siempre la ciberseguridad (nunca dar contraseñas, usar enlaces oficiales, no confiar en intermediarios).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error('Error generating AI response:', err);
      res.status(500).json({ error: 'Failed to generate financial advisor response', details: err?.message });
    }
  });

  // Vite middleware for dev / static for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cifraflow Server running on port ${PORT}`);
  });
}

startServer();
