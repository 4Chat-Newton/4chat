import express from "express";
const app:any = express();
const port:Number = 3000;

app.get('/', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});