import express from "express";
import sqlite from "sqlite3";
import {encryptPassword, validateUser} from './authentication';
const port: Number = 8080;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())
export const db = new sqlite.Database('./database/database.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database.')
});

server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`http://localhost:${port}/data`);
});

const myPlaintextPassword = 'Hannes420';//Ska laddas från db
server.get('/auth', async ()=>{
    await encryptPassword(myPlaintextPassword)
})

// routes
require('./routes/register')(server,db)
