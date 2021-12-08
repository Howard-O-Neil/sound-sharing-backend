import express from 'express';

export const app = express();
const port = 3002;

app.get('/', (_, res) => {
    res.send('hello world ');
});

app.listen(port)
