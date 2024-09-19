import express from 'express';
import morgan from 'morgan';
import cors from 'cors'; 
import autorouter from './routers/auto_routers.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Bienvenido a la API'); 
});

app.use(autorouter);

export default app;
