const getAlljobs = (req,res) => {
  res.send('All jobs ')
}

const getjob = (req,res) => {
  res.send('Get one job')
}

const createjob = (req,res) => {
  res.send('Creating jobs ')
}
const updatejob = (req,res) => {
  res.send('Updating job')
}

const deletejob = (req,res) => {
  res.send('Deleting job')
}

module.exports = {
  getAlljobs,
  getjob, 
  createjob,
  updatejob,
  deletejob
}