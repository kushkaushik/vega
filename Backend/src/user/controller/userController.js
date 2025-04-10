const userService = require('../services/userServices')
const { STATUS_CODES, MESSAGES } = require('../../../constants/constant')
const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const image = req.file.buffer;

        if (!req.file || !email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.MISSING_FIELDS });
        }

        const user = await userService.registerUser(email, password, image);
        res.status(STATUS_CODES.CREATED).json({ message: "User registered successfully!", user });
    }catch(error) {
        next(error)
    }
}

const loginUser = async(req, res, next) =>{
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: MESSAGES.MISSING_FIELDS });
        }
    
        const token = await userService.loginUser(email, password);
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(STATUS_CODES.SUCCESS).json({ message: "User login successfully!" });
    }catch(error){
        next(error)
    }
}

const userProfile = async (req, res, next) => {
  try {
    const {userId} = req.user;
    const user = await userService.getProfile(userId);
    res.status(STATUS_CODES.SUCCESS).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, userProfile }