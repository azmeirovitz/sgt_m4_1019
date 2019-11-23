//console.log("main.js loaded");

$(document).ready(initApp);

function initApp(){
    console.log('App Initialized');
    $('#button').click(submitFormData);
    getStudents();
}

function submitFormData (){
    const name = $('#name');
    const course = $('#course');
    const grade = $('#grade');

    addStudent (name.val(), course.val(), grade.val());

    name.val('');
    course.val('');
    grade.val('');
    
}

function getStudents () {

    const config = {
        url: '/api/students',
        success: resp => {
            console.log('resp: ', resp);
            addStudentsToDom(resp.students);
        }
    }


    $.ajax(config);
}

function addStudentsToDom(students) {
    const studentElement = [];
    const tbody = $('#student-data');

    tbody.text('');

    students.forEach(student => {
        const tr = $('<tr>');
        const name = $('<td>', {text: student.name});
        const course = $('<td>', {text: student.course});
        const grade = $('<td>', {text: student.grade});

        tr.append(name, course, grade);

        studentElement.push(tr);
    });

    tbody.append(studentElement);

    
}



function addStudent(name, course, grade){ //Where is it called?
    $.ajax({
        method: 'POST',
        url: 'api/students',
        data: {
            name: name,
            course: course,
            grade: grade
        },
        success: (resp) => {
            console.log('Student added', resp);
            getStudents();
        }
    })
}