const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port=3000
const db = require('./queries')


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
    )

app.get('/', (request, response) => {
    response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/users/all',db.getAllUsers)
app.get('/user/:id',db.getUserById)
app.post('/users/new',db.addUser)
app.put('/users/:id',db.updateUser)
app.delete('/users/delete/:id',db.removeUser)

app.listen(port, ()=>{
    console.log(`application is running on port ${port}.`)
})