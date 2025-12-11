import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
