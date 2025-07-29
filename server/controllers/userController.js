import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'

import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ 
            success: true, 
            token, 
            user:{name: user.name},
            credits: user.creditBalance 
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const response = { 
                success: true, 
                token, 
                user: { name: user.name },
                credits: user.creditBalance 
            };
            res.json(response)
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const userCredits = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.json({ success: false, message: "User ID not found" })
        }

        const user = await userModel.findById(userId)
        
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }
        
        const response = {success: true, credits: user.creditBalance, user:{name: user.name}};
        res.json(response)
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {registerUser, loginUser, userCredits}