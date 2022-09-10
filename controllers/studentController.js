// path module
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const getAllStudent = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  res.render('student/index', { student });
};

const createStudent = (req, res) => {
  res.render('student/create');
};

const updateStudent = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  console.log(req.body.location);

  // get id
  const { id } = req.params;

  // find by id
  // update data and send back to object
  student[student.findIndex((data) => data.id == id)] = {
    ...student[student.findIndex((data) => data.id == id)],
    name: req.body.name,
    email: req.body.email,
    cell: req.body.cell,
    location: req.body.location,
  };

  // get data
  writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(student));

  res.redirect('/student');
};

// edit controllers
const editStudent = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  // get id
  const { id } = req.params;

  // find by id
  const edit_data = student.find((data) => data.id == id);

  res.render('student/edit', {
    stu: edit_data,
  });
};

const deleteStudent = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  const { id } = req.params;

  // find by id
  const newStu = student.filter((data) => data.id != id);

  writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(newStu));

  res.redirect('/student');
};

const showSingleStudent = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  const { id } = req.params;

  // find by id
  const stu = student.find((data) => data.id == id);

  res.render('student/show', { stu });
};

const studentDataStore = (req, res) => {
  // student old data
  const student = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));

  // desctructuring data
  const { name, email, cell, location } = req.body;

  // get the last id
  let last_id = 1;
  if (student.length > 0) {
    last_id = student[student.length - 1].id + 1;
  }

  // add new array to student
  student.push({
    // get the last id
    id: last_id,
    name,
    email,
    cell,
    location,
    photo: req.file ? req.file.filename : 'avatar.png',
  });

  // now put data to json db
  writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(student));

  // redirect after add
  res.redirect('/student');
};

module.exports = {
  getAllStudent,
  createStudent,
  showSingleStudent,
  studentDataStore,
  updateStudent,
  editStudent,
  deleteStudent,
};
