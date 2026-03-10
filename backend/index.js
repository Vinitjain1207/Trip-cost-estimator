import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000; // You can use any available port
app.use(cors());
app.use(express.json());

app.get('/hi', (req, res) => {
  res.json({ message: 'Hello from the Node.js backend!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/hi`);
});
