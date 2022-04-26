const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  /**Error checking can be in con troller or in mongoose, for more meaningful error messages. */
  /** Passwords must be stored as hashes, not as strings.
   * if(!name || !email || !password){
   * throw new BadRequestError('Please provide name, email or password.')
   *}
   */
  // const tempUser = {name, password:hashedPassword,email}
  const user = await User.create({ ...req.body });
  /**The front-end can decode the token sent back, but decoding you can also do it here. */
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isCorrectPassword = await user.checkPasswords(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid Password");
  }

  // Past this point, then user exists, recreate token and send to frontend with some info
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
