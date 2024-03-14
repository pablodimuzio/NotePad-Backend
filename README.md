# What does it needs ?



- Express v4.18^

- dotenv v16.4^

- body-parser v1.20^

- google-auth v9.6.3^

- google-spreadsheet v4.1.1^

  

# How does it works ?

  

Use the OAuth token to call the Sheets API using it as a DB on the behalf of the user, storing data directly on Google Drive as it is not sensitive to the end-user.

# Terminology:

Some elements of the Google Sheets API are named in a way that may be confusing, here are the naming standarts as of v4.

- The **Spreadsheet** is the Google document.
- The **Sheet** is the subdocument of the **Spreadsheet**.
- The **Columns**, **Rows** and **Cells**  of the **Sheet** have namings explicit enough. 

# Access points:

  

- /getNotes/
Request of the form:
> **Body** :  {
> ``accessToken``: Your Google API access Token, 
> ``page``: The page you want to retrieve form the Sheet (results depend on the ``notesPerPages`` param.), 
> ``notesPerPages``: The number of notes you want to be retrived from the Sheet
> }