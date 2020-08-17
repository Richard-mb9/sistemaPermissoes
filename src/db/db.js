const {Client} = require("pg");
const db = new Client({
    host:"192.168.99.100",
    port:5432,
    database:"db_mer",
    user:"postgres",
    password:"richard",
})


//função que envia as querys para o banco de dados
async function querys(query){
    const dados =  await db.query(query)
    return dados.rows
}

module.exports = {db,querys}
   

