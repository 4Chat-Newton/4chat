import express from "express";
import {encryptPassword, validateUser} from './authentication';
const server = express();
const port:Number = 8080;

server.get('/', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const myPlaintextPassword = 'Hannes420';//Ska laddas från db
server.get('/auth', async ()=>{
    await encryptPassword(myPlaintextPassword)
})

