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



app.get('/api/students', async (req, res) => {
    const result = await db.query('SELECT * FROM grades');

    res.send({
        
        message: 'This will contain students',
        students: result
    });
});

app.listen(3000, () => {
    console.log('Server listening @ localhost:3000');
});
