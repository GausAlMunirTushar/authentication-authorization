import jwt from 'jsonwebtoken';

/**
 * Middleware function to authenticate the user using a token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization;

        // Check if token exists
        if (!token) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        if (!token) {
            return res.status(401).json({ message: "Token missing" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set user in req.user
        req.user = decoded;

        // Call next middleware
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token expired" });
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: "Invalid token" });
        } else {
            console.error("Unexpected error during token verification:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};


export default authenticate;