const express = require('express');
const {
  getAllStudent,
  createStudent,
  editStudent,
  showSingleStudent,
  studentDataStore,
  deleteStudent,
  updateStudent,
} = require('../controllers/studentController');

const multer = require('multer');
const path = require('path');

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/students')),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const stuMulter = multer({ storage }).single('photo');

// route area
router.get('/', getAllStudent);

// create route
router.get('/create', createStudent);
router.post('/create', stuMulter, studentDataStore);

// edit route
router.get('/edit/:id', editStudent);
router.post('/update/:id', stuMulter, updateStudent);

// delete route
router.get('/delete/:id', deleteStudent);
router.get('/:id', showSingleStudent);

module.exports = router;
