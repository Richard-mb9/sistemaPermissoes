const express = require('express')
const {querys} = require('../db/db')

const router = express.Router();


//retorna um json com todos os systemas cadastrados no banco
router.get('/systems', async(req,res) =>{
    try{
        const systems = await Promise.resolve(querys("SELECT * FROM tbsystem"))
        return res.send(systems)
    }
    catch(err){
        return res.status(400).send(err)
    }
})


router.get('/systems/:idsystem', async(req,res) =>{
    const idsystem = req.params.idsystem
    try{
        const rules = await Promise.resolve(querys(`SELECT * FROM tbrule where idsystem = ${idsystem}`))
        return res.send(rules)
    }
    catch(err){
        return res.status(400).send(err)
    }
})


module.exports = app => app.use('/',router);