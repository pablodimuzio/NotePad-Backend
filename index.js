const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config()

const http = require('http');
const { OAuth2Client } = require('google-auth-library');

const oauthClient = new OAuth2Client()

const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

const PORT = 3300

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get("/", (req, res) => {
    res.send('Hello World!');
});

app.post("/auth", async (req, res) => {
    try {
        const code = req.headers.authorization;
        
        const response = await http.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: 'postmessage',
                grant_type: 'authorization_code'
        });
        const accessToken = response.data.access_token;
        console.log('Access Token: ', accessToken);

        const userResponse = await http.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
        })

        const userDetails = userResponse.data;
        console.log('User Details:', userDetails);

        res.status(200).json({ message: 'Authentifcation Successful'});
    } catch (error) {
        console.log('Error while saving code', error);
        res.status(500).json({message: 'Failed to save code'});
    }
})

app.post("/login", jsonParser , (req, res) => {
    console.log(req.body.accessToken);
    res.status(200).json({ message: 'Login Successful' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})