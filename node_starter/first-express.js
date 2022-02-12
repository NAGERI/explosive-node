const express = require('express')

const app = express()

/*routes */
app.get('/hello', (req,res) => {
  res.send('<b>Task manager is up and running</b>')
})
app.get('/', (req,res) => {
  res.send('<b>Hello Node world</b>')
})
const port = 3000

app.listen(port,console.log(`Server is listening on port ${port}`))