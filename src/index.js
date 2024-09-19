import app from './app.js';
import {connectDB} from './db.js'

connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Abierto en el puerto ${port}`);
});

