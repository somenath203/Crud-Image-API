const express = require('express');

const upload = require('../utils/multerconfig');
const { getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();


router.get('/', getAllUsers);

router.post('/', upload.single('image'), createUser);

router.put('/:id', upload.single('image'), updateUser);

router.delete('/:id', deleteUser);



module.exports = router;

