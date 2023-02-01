import express from "express";
import cors from "cors";
import { signIn, signOut} from "./routes/authentication";
import cookieparser from "cookie-parser";


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
});

require("./routes/register")(server, db)

signIn(server, db, true)
signIn(server, db, false)
signOut(server, db)

server.get("/data/exit", async (req, res)=> {
    // console.log(shutdown())
    setTimeout(process.exit,2000)
    res.json({message: "Done, Exiting in 2 seconds"})
})