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

app.use(express.json()); 


// lines 21 to 29 is 1 endpoint for the user in our server: GET info 
app.get('/api/students', async (req, res) => {

    //returns [[raw data], [Field Data]]
// Which is [[raw data, array of objects], [Field Data, info about the different fields: the raw data from each field, that's why it's so long--We don't need it]]
    const [result] = await db.query('SELECT * FROM grades'); //brings item zero, the raw data

    ///const dbResult = await db.query('SELECT * FROM grades');
    /// const result = dbResulat[0];

    res.send({
        
        //message: 'This will contain students',
        students: result
    });
});

app.post('/api/students', async(req, res) => {
    const {name, course, grade} = req.body;
    const errors = [];

    if (!name) {
        errors.push('No student name received');
    }
    if (!course) {
        errors.push('No student course received');
    }
    if (!grade && grade !==0) {
        errors.push('No student grade received')
    } else if (isNaN(grade)) {
        errors.push('Student course grade must be a number');
    } else if (grade < 0 || grade > 100) {
        errors.push('grade must be between 0 to 100');
    }

    if (errors.length) {
        res.status(422).send({
            errors: errors
        });
        return;
    }

    const [result] = await db.execute(`
        INSERT INTO grades (name, course, grade) VALUES (?, ?, ?)    
    `, [name, course, grade]);

    console.log('Add student to Result:', result);

    res.send({
        message: `Successfully added grade record for ${name}`, student: {
            id: result.insertId,
            name: name,
            course: course,
            grade: grade
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening @ localhost:3000');
});
