const express = require('express')

const app = express()
app.get('/hello', (req,res) => {
  res.send('<b>Task manager is up and running</b>')
})
const port = 3000

app.listen(port,console.log(`<b>Server is listening on port ${port}</b>`))