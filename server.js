const express = require('express');
const db = require('./db');


// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost', 
//     user: 'root',
//     password: 'root',
//     database: "sgt_m4_1019",
//     port: 3306
// });

// const db = pool.promise(); ///Doing this in another file

const app = express();


// lines 21 to 29 is 1 endpoint for the user in our server: GET info 
app.get('/api/students', async (req, res) => {

    //[[raw data], [Field Data]]
// returns [[raw data, array of objects], [Field Data, info about the different fields: the raw data from each field, that's why it's so long--We don't need it]]
    const [result] = await db.query('SELECT * FROM grades'); //brings item zero, the raw data

    ///const dbResult = await db.query('SELECT * FROM grades');
    /// const result = dbResulat[0];

    res.send({
        
        //message: 'This will contain students',
        students: result
    });
});

app.listen(3000, () => {
    console.log('Server listening @ localhost:3000');
});
