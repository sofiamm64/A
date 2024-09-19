import express from 'express';
import morgan from 'morgan';
import cors from 'cors';  // Cambiar 'require' a 'import'
import autorouter from './routers/auto_routers.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(autorouter);

export default app;
