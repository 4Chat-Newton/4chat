import express from "express";
import cors from "cors";
import { signIn, signOut} from "./routes/authentication";
import cookieparser from "cookie-parser";
import {wait} from "@testing-library/user-event/dist/utils";
const { spawn } = require('child_process')

const port: Number = 8080;
const host: string = `http://localhost:${port}`;
export const server: any = express();
server.use(express.json());
server.use(express.urlencoded())
server.use(cors())
server.use(cookieparser())

export const db = require('better-sqlite3')('./db/database.db');


server.get('/data', (req, res) => {
    res.send('NodeJS + Express + Typescript App Up! 👍');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`${host}/data`);

    // process.on('exit', (code) => {
    //     console.log(`Exiting with code: ${code}`);
    // });
    //
    // process.on('SIGINT', () => {
    //     console.log('Received SIGINT. Exiting...');
    //     process.exit(0);
    // });
});

require("./routes/register")(server, db)

signIn(server, db, true)
signIn(server, db, false)
signOut(server, db)

// server.get("/data/exit", async (req, res)=> {
//     setTimeout(process.exit,2000)
//     res.json({message: "Done, Exiting in 2 seconds"})
//     // await wait(2000)
//     // spawn('cd .. && pkill node.exe', [], { shell: true, stdio: 'inherit' })
// })
