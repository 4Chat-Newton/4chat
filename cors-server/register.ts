import express from 'express';
import sqlite from 'sqlite3';

const db =  new sqlite.Database(':memory:');
const server = express();

server.use(express.json());

server.post('/register', async (request: express.Request, response: express.Response) => {
    const { username, email, password } = request.body;
    const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    db.run(query, [username, email, password]);
    response.json({ userCreated: true });
});