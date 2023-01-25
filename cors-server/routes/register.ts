import express from 'express';

module.exports = function (server, db){

    server.get('/data/register', (req, res) => {

        db.all("SELECT * FROM user", (err, rows) => {
            if (err) {
                // console.log(err);
            } else {
                res.send(rows);
                // console.log(rows);
            }
        })
    })

    server.post('/data/register', (request: express.Request, response: express.Response) => {
        const {username, email, password, online} = request.body;
        const query = 'INSERT INTO user (username, email, password, online) VALUES(?, ?, ?, ?)';
        db.run(query, [username, email, password, online]);
        response.json({userCreated: true});
    });
}
