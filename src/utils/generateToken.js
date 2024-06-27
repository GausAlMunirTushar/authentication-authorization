import jwt from "jsonwebtoken";

const generateToken = (email, role) => {
  const payload = { email, role };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
};

export default generateToken;
