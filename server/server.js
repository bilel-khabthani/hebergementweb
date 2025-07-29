import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 
import productRoutes from './routes/productRoutes.js';
import statistiquesRouter from './routes/AdminRouter.js';
import reviewRouter from './routes/reviewRoutes.js';
import panierRoutes from "./routes/panierRoutes.js";
import newsletterRouter from './routes/newsletterRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import supportRouter from './routes/supportRoutes.js'; // Added support routes
import dotenv from 'dotenv';
import crypto from 'crypto';
import chatRoutes from './routes/chatRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Connexion à la base de données
connectDB();
const generateTawkHash = (userId) => {
  const secret = process.env.TAWKTO_SECRET;
  return crypto.createHash('md5').update(userId + secret).digest('hex');
};


const allowedOrigins = [
  'http://localhost:5173',
  'https://memo-nto3.onrender.com',
  'https://memo-frontend-autre-url.com' // ajoute toutes tes URLs frontend ici
];

app.use(cors({
  origin: function(origin, callback) {
    // Permet les requêtes sans origin (ex: Postman ou curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-token'],
}));


// Middleware JSON & cookies
app.use(express.json());
app.use(cookieParser());

// ✅ Headers de sécurité (optionnels mais gardés)
app.use((req, res, next) => {
  if (req.path === '/api/auth/google') {
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  } else {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  }
  next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRoutes);
app.use('/api/review', reviewRouter);
app.use('/api/prod', statistiquesRouter);
app.use("/api/panier", panierRoutes);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/messages', messageRouter);
app.use('/api/support', supportRouter); // Added support route
app.use("/api/chat", chatRoutes);
/* 👉 ROUTE OLLAMA POUR TON CHATBOT
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  console.log('📝 Message reçu du frontend :', message);

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral', // tu peux aussi tester "llama3" ou autre modèle
        prompt: message,
        stream: true
      })
    });

    const raw = await response.text();
    let reply = '';
    raw.split('\n').forEach(line => {
      if (line.trim()) {
        const json = JSON.parse(line);
        if (json.response) reply += json.response;
      }
    });

    console.log('🤖 Réponse du modèle :', reply);
    res.json({ reply });
  } catch (err) {
    console.error('❌ Erreur Ollama :', err);
    res.status(500).json({ error: 'Erreur avec le modèle local' });
  }
});*/

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
