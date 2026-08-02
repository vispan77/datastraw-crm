import User from "../model/user.js";
import jwt from "jsonwebtoken";



const googleAuth = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        if (!name || !email || !avatar) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                avatar
            })
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `something went wwrong in the google auth ${error}`
        })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `something went wwrong in the logout ${error}`
        })
    }
}

const getMe = async (req, res) => {

    try {

        const userId = req.headers["x-user-id"];

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `something went wwrong in getme ${error}`
        })
    }
}

export {
    googleAuth,
    logout,
    getMe
}