const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  /**Error checking can be in con troller or in mongoose, for more meaningful error messages. */
  /** Passwords must be stored as hashes, not as strings.
   * if(!name || !email || !password){
   * throw new BadRequestError('Please provide name, email or password.')
   *}
   */
  // const tempUser = {name, password:hashedPassword,email}
  const user = await User.create({ ...req.body });
  /**The front-end can decode the token sent back, but decoding you can do it here. */
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = (req, res) => {
  res.send("Login User");
};

module.exports = {
  register,
  login,
};
