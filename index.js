const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const corsOptions = {
    origin: 'https://person-table-test.herokuapp.com/',
    optionsSuccessStatus: 200
}

app.get('/', cors(corsOptions), (req, res) => {
    res.send('Hello World!')
})
app.put('/', cors(corsOptions), (req, res) => {
    res.send('Hello World!')
})
app.post('/', cors(corsOptions), (req, res) => {
    res.send('Hello World!')
})
app.delete('/', cors(corsOptions), (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})