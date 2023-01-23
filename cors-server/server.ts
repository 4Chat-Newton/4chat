declare var require: any; //! ta bort innan launch

const express = require('express');
const app = express();
const path = require('path');


// app.use(express.static(__dirname + '../build'))
app.use('/', express.static('../public'));
// app.get('/', (req, res) => {
//     res.send('Welcome to CORS server 😁')
// })
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({'msg': 'This has CORS enabled 🎈'});
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})