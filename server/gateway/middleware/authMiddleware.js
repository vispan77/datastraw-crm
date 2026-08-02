
import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required please login"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid and the user is not authenticated"
            })
        }

        req.userId = decoded._id

        console.log("userId in the gateway", req.userId)

        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `went wrong in the authentication ${error}`
        })
    }
}

export default isAuth;

