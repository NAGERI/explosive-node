const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAlljobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs: jobs, count: jobs.length });
};

const getjob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with Id ${jobId}`);
  }
  res.status(StatusCodes.CREATED).json({ job });
};

const createjob = async (req, res) => {
  /**We can access the userId since in our jobs request in apps.js, we placed the auth middleware in front of all routes line 23 */
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};
const updatejob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req; //**Destructuring the req object */

  if (company === "" || position === "") {
    throw new BadRequestError("Company or position cannot be empty!");
  } // Setting the check in the controller
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with Id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deletejob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  res.status(StatusCodes.OK).send(`Deleted job ${job}`);
};

module.exports = {
  getAlljobs,
  getjob,
  createjob,
  updatejob,
  deletejob,
};
