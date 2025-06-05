import User  from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      throw new CustomError('User not found', 404);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new CustomError('Invalid credentials', 401);
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    return res.status(200).json({
      token,
      role: user.role,
      message: `${user.role} logged in successfully`
    });
};

