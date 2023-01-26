import express from "express";
import sqlite from "sqlite3";
import {encryptPassword, validateUser} from './routes/authentication';
const port: Number = 8080;
const host: String = `http://localhost:${port}`;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())

// const cors = require('cors');
// server.use(cors())

server.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
export const db = new sqlite.Database('./db/database.db', (err) => {
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
    console.log(`${host}/data`);
});

// routes
require('./routes/register')(server,db)
// require('./routes/api-description')(host, db)
