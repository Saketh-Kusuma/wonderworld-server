import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import chatRouter from './routes/chat.router';
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/chat', chatRouter);

app.get('/api', (req: Request, res: Response) => {
   res.send('<h1>Hello World</h1>');
});

app.listen(port, () => {
   console.log('Server started');
});
