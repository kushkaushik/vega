const cloudinary = require('../../../utils/cloudinary')
const { generateToken } = require('../../../utils/jwt')
const bcrypt = require('bcrypt');
const User = require('../module/userModule')

const registerUser = async(email, password, imageBuffer) => {

    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error('Email already exists!')
    }

    const cloudinaryResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'users' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(imageBuffer);
      });

      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = new User({
        email,
        password: hashedPassword,
        image: cloudinaryResponse.secure_url,
      });
    
      await user.save();
      return user;
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error('Invalid email or password');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
  
    const token = generateToken({ userId: user._id });

    return token
};

const getProfile = async(userId) =>  {
  return await User.findById(userId).select('image email')
}

module.exports = { registerUser, loginUser, getProfile }