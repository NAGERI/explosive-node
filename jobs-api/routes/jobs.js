const express = require('express');
const router = express.Router()

const {getAlljobs,getjob,createjob,deletejob, updatejob } = require('../controllers/jobs')

router.route('/').post(createjob).get(getAlljobs)
router.route('/:id').get(getjob).delete(deletejob).patch(updatejob)

module.exports = router
