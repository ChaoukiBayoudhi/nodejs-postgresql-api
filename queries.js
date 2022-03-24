const Pool = require('pg').Pool
const pool=new Pool({
    user:'me',
    host:'localhost',
    database:'apidb',
    password:'passwordOfMe',
    port:5432,
})

//returns all users if Ok, Exception if not
const getAllUsers=(request,response) => {
    pool.query(
        'select * from users order by id ASC',
(error,results)=>{
    if(error){
       throw error
    }

response.status(200).json(results.rows)
})
}
//returns a user having as id the value provided as path parameter
//if Ok, Exception if not
const getUserById=(request,response)=>{
    const id=parseInt(request.params.id)

    pool.query('select * from users where id = $1',[id],(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}
//add a new user. The user is provided on the body of the request
//returns 201 as HTTP status if Ok, Exception if not
const addUser=(request,response) =>{
    const {name,email}=request.body

    pool.query('insert into users (name, email) values ($1, $2) returning id', [name,email], (error,results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`User with ID : ${results.rows[0].id} has been successfully added`)
    })
}
//update user using provided id value on the path
//the new user attributes values are passed on the body of the http request
//return 200 as http status if Ok, Exception if not

const updateUser = (request,response) =>{
    const id=parseInt(request.params.id)
    const {name,email}=request.body

    pool.query('update users set name=$1, email=$2 where id=$3', [name,email,id],
    (error,results) =>{
        if(error){
            throw error
        }
        response.status(200).send(`User with id : ${id} has been successfully updated`)
    })
}

//remove user with the passed id in the path
//returns 200 as HTTP status if Ok, Exception if not
const removeUser = (request,response) => {
    const id=parseInt(request.params.id)

    pool.query('delete from users where id=$1',[id],
    (error, results) => {
        if(error){
            throw error
        }
        response.status(200).send(`User (id=${id}) has been successfully deleted`)
    }
    )
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser,
}
