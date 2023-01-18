import express, { Express, Request, Response } from 'express';

const app: Express = express();

const PORT = process.env.SERVER_PORT || 8080;

app.get('/api/ping', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Pong' });
});

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:8080');
});
