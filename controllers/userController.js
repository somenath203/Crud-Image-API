const User = require('./../models/user');
const cloudinaryConfig = require('../utils/cloudinaryconfig');

// Getting All Users
const getAllUsers = async (req, res) => {

    try {
        
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: 'all users fetched successfully',
            allUsers: users
        });

    } catch (error) {
        
        res.status(500).send(error);

    }
};

// Creating a new User
const createUser = async (req, res) => {

    try {

        if(!req.file) {

            return res.status(400).send({
                success: false,
                message: 'Please provide a file'
            })
        };
        
        const result = await cloudinaryConfig.uploader.upload(req.file.path, {
            folder: 'curd image collection'
        });

        const newUser = await User.create({
            fullName: req.body.fullname,
            avatar: result.secure_url,
            cloudinary_id: result.public_id
        });

        res.status(201).json({
            success: true,
            message: 'user created successfully',
            userDetails: newUser
        });
        
    } catch (error) {

        res.status(500).send(error);
    
    }
};

// update an user
const updateUser = async (req, res) => {

    try {
        
        const userId = req.params.id;

        const user = await User.findById(userId);

        if(!user) {

            return res.status(400).send({
                success: false,
                message: `User with ID ${userId} won't exist`
            });
        };

        await cloudinaryConfig.uploader.destroy(user.cloudinary_id); // destroying the prev image

        const updatedProfilePic = await cloudinaryConfig.uploader.upload(req.file.path, {
            folder: 'curd image collection'
        }); // then, uploading a new image

        const updatedData = {
            fullName: req.body.fullname,
            avatar: updatedProfilePic.secure_url,
            cloudinary_id: updatedProfilePic.public_id
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });

        res.status(201).json({
            success: true,
            message: `user with ID ${userId} has been updated successfully`,
            updateduserDetails: updatedUser
        })
    } catch (error) {
        
        res.status(500).send(error);

    }
};

// delete user
const deleteUser = async (req, res) => {

    try {
        
        const userId = req.params.id;

        const user = await User.findById(req.params.id);

        if(!user) {

            return res.status(400).send({
                success: false,
                message: `user with ID ${userId} won't exist.`
            });

        };

        await cloudinaryConfig.uploader.destroy(user.cloudinary_id);

        await user.remove();

        res.status(200).json({
            success: true,
            message: `user with ID ${userId} has been deleted successfully`
        });

    } catch (error) {
        
        res.status(500).send(error);

    }
};


module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};