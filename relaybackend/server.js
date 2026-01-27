const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
  origin: true
}))

app.post('/api/test', (req, res) => {
  const data = req.body
  console.log(data)

  if (data) {
    res.status(201).json({
      message: 'Data stuff'
    })
  } else {
    res.status(400).send('No data provided')
  }

  console.log('recieved message')
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
