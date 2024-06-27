import bcrypt from 'bcryptjs';

const comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

export default comparePassword;