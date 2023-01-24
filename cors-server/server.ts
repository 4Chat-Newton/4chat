import express from "express";
const server:any = express();
const port:Number = 8080;

server.get('/', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});