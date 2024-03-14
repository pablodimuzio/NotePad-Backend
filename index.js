const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());


var auth = require('./auth/auth');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.post("/auth", auth.getNotes);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})