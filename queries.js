const Pool = require('pg').Pool
const pool=new Pool({
    user:'me',
    host:'localhost',
    database:'apidb',
    password:'passwordOfMe',
    port:5432,
})

const getAllUsers=(request,response) => {
    pool.query(
        'select * from users order by name ASC',
(error,results)=>{
    if(error){
       throw error
    }

response.status(200).json(results.rows)
})
}



module.exports = {
    getAllUsers,
}