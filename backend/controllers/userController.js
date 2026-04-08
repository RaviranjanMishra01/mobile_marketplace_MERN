const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const newUser = require("../model/Registeruser");


//Token create
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await newUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Password encrypt karo
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await newUser.create({
            username, email, password: hashedPassword
        })

        //token create
        const token = generateToken(user._id);

        res.status(201).json(
            {
                success: true,
                message: "Registered successfully",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }
        )

    } catch (error) {
        console.error("internal server error", error)
    }
}



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await newUser.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" })
        }
        // Blocked user or not check
        if (existingUser.isBlocked) {
            return res.status(403).json({
                message: "This account blocked some kind off regin"
            })
        }
        // Password check karo
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Token banao
        const token = generateToken(existingUser._id);

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.username,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        console.error("Login error", error)
        res.status(500).json({ message: "Server error" })
    }
}