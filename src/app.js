import express from 'express'
import morgan from 'morgan'
import autorouter from './routers/auto_routers.js';

const cors = require('cors');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}),
app.use(autorouter)
);

export default app;
