const { Faculty, Department, Teacher } = require('./models');

const faculties = [
    {
        ID_Faculty: 1,
        Name: 'Faculty of Science',
        Description: 'This faculty focuses on science.'
    },
    {
        ID_Faculty: 2,
        Name: 'Faculty of Arts',
        Description: 'This faculty focuses on arts.'
    },
    {
        ID_Faculty: 3,
        Name: 'Faculty of Business',
        Description: 'This faculty focuses on business.'
    },
    {
        ID_Faculty: 4,
        Name: 'Faculty of Education',
        Description: 'This faculty focuses on education.'
    },
    {
        ID_Faculty: 5,
        Name: 'Faculty of Engineering',
        Description: 'This faculty focuses on engineering.'
    },
    {
        ID_Faculty: 6,
        Name: 'Faculty of Law',
        Description: 'This faculty focuses on law.'
    },
    {
        ID_Faculty: 7,
        Name: 'Faculty of Medicine',
        Description: 'This faculty focuses on medicine.'
    },
    {
        ID_Faculty: 8,
        Name: 'Faculty of Social Sciences',
        Description: 'This faculty focuses on social sciences.'
    },
    {
        ID_Faculty: 9,
        Name: 'Faculty of Information Science',
        Description: 'This faculty focuses on information science.'
    },
    {
        ID_Faculty: 10,
        Name: 'Faculty of Agriculture',
        Description: 'This faculty focuses on agriculture.'
    },
];

Faculty.insertMany(faculties)
    .then(() => console.log('Faculties created'))
    .catch(error => console.error(error));

const departments = [
    {
        ID_Department: 1,
        Name: 'Mathematics',
        Description: 'Department of Mathematics.',
        ID_Faculty: 1
    },
    {
        ID_Department: 2,
        Name: 'Physics',
        Description: 'Department of Physics.',
        ID_Faculty: 1
    },
    {
        ID_Department: 3,
        Name: 'English',
        Description: 'Department of English.',
        ID_Faculty: 2
    },
    {
        ID_Department: 4,
        Name: 'History',
        Description: 'Department of History.',
        ID_Faculty: 2
    },
    {
        ID_Department: 5,
        Name: 'Psychology',
        Description: 'Department of Psychology.',
        ID_Faculty: 8
    },
    {
        ID_Department: 6,
        Name: 'Computer Science',
        Description: 'Department of Computer Science.',
        ID_Faculty: 9
    },
    {
        ID_Department: 7,
        Name: 'Electrical Engineering',
        Description: 'Department of Electrical Engineering.',
        ID_Faculty: 5
    },
    {
        ID_Department: 8,
        Name: 'Civil Engineering',
        Description: 'Department of Civil Engineering.',
        ID_Faculty: 5
    },
    {
        ID_Department: 9,
        Name: 'Biology',
        Description: 'Department of Biology.',
        ID_Faculty: 1
    },
    {
        ID_Department: 10,
        Name: 'Chemistry',
        Description: 'Department of Chemistry.',
        ID_Faculty: 1
    },
];

Department.insertMany(departments)
    .then(() => console.log('Departments created'))
    .catch(error => console.error(error));


const teachers = [
    {
        ID_Teacher: 1,
        Name: 'John',
        Surname: 'Smith',
        Phone: '555-1234',
        ID_Department: 1
    },
    {
        ID_Teacher: 2,
        Name: 'Jane',
        Surname: 'Doe',
        Phone: '555-1258',
        ID_Department: 2
    },
    {
        ID_Teacher: 3,
        Name: 'Michael',
        Surname: 'Johnson',
        Phone: '555-2468',
        ID_Department: 3
    },
    {
        ID_Teacher: 4,
        Name: 'Sarah',
        Surname: 'Lee',
        Phone: '555-7890',
        ID_Department: 4
    },
    {
        ID_Teacher: 5,
        Name: 'Emily',
        Surname: 'Chen',
        Phone: '555-1357',
        ID_Department: 5
    },
    {
        ID_Teacher: 6,
        Name: 'David',
        Surname: 'Kim',
        Phone: '555-2468',
        ID_Department: 6
    },
    {
        ID_Teacher: 7,
        Name: 'Stephanie',
        Surname: 'Brown',
        Phone: '555-6789',
        ID_Department: 7
    },
    {
        ID_Teacher: 8,
        Name: 'Eric',
        Surname: 'Rodriguez',
        Phone: '555-3698',
        ID_Department: 8
    },
    {
        ID_Teacher: 9,
        Name: 'Kevin',
        Surname: 'Davis',
        Phone: '555-2345',
        ID_Department: 9
    },
    {
        ID_Teacher: 10,
        Name: 'Lisa',
        Surname: 'Gabler',
        Phone: '555-2467',
        ID_Department: 10
    },
    
];

Teacher.insertMany(teachers)
    .then(() => console.log('Teachers created'))
    .catch(error => console.error(error));
