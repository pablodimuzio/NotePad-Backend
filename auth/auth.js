'use strict';

const { OAuth2Client } = require('google-auth-library');
const { GoogleSpreadsheet } = require('google-spreadsheet');

var notes = [];

const oauthClient = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});


exports.getNotes = async (req, res) => {
    try {
        const notesPerPages = req.body.notesPerPages;
        const page = req.body.page;

        oauthClient.credentials.access_token = req.body.accessToken;


        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, oauthClient);
        await doc.loadInfo();
        const noteSheet = doc.sheetsByIndex[process.env.GOOGLE_SHEET_INDEX];

        await noteSheet.getRows({
            offset: notesPerPages * page,
            limit: notesPerPages,
        }).then((rows) => {
            for (let i = 0; i < notesPerPages; i++) {
                let note = {
                    id: rows[i].get('id'),
                    title: rows[i].get('title'),
                    content: rows[i].get('content'),
                    date: rows[i].get('date'),
                };
                notes.push(note);
            }

            return notes;
            
        }).then( (notes) => {
            console.log(notes);
            res.status(200).send(notes);
        }
        );

    } catch(error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

