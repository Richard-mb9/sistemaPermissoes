const express = require('express')
const {querys} = require('../db/db')

const router = express.Router();

/** 
 * serviço que exibe as parmissões do usuario, e as permissões que
 * determinado sistema possui disponiveis, para consultar
 * as invormações do usuario e do systema, basta enviar os dados na seguinte
 * url /permissions/{idlogin}/{idsystem}/
*/

router.get('/permissions/:idlogin/:idsystem', async(req,res) =>{
    try{
        //recebe os dados enviados na url e os atribui as suas devidas variaveis
        const Login = req.params.idlogin
        const System = req.params.idsystem
        
        /**
         * envia uma query para o banco fazendo um left join nas tabelas tbloginrules e tblogin
         * baseadas no idlogin que foi informado na url, e retorna um json com 
         * as permissões desse respectivo login
         */
        const rules = await Promise.resolve(querys(`
            select 
                tbLogin.idLogin,
                Login,
                nome,
                tbLoginRules.idRule
            from 
                tbLogin
            left join tbLoginRules
                on tbLoginRules.idLogin = tbLogin.idLogin
            where 
                tbLogin.idLogin = ${Login}`))
        

        /**
         * envia uma query para o banco para consultar as permissões
         * do systema que foi informado na url, envia para o usuario
         * um json com o id da permissão e o nome da permissão
         */
        const system = await Promise.resolve(querys(`
            select *
            from
                tbrule
            where
                idsystem = ${System}`))

        
        /*cria uma lista com as permissões que o 
        login possui referente ao sistema informado*/
        let permissions = []
        for(let i = 0; i < rules.length; i++){
            if(rules[i]['idrule'] != null){
                permissions.push({idrule:rules[i]['idrule']})
            }
        }

        //cria um json com os dados do login informado na url
        let login = {
            idlogin:rules[0]['idlogin'],
            login:rules[0]['login'],
            nome:rules[0]['nome'],
            permissions:permissions
        }

        /**
         * cria um unico arquivo json com os dados do login e os 
         * e os dados do systema informados na url, e as permissões
         * que esse login possui,
         * e tambem envia as permissões que o systema informado 
         * possui disponiveis, e envia este json para o usuario
         */
        let lista = {login:login,systemRules:system}
        return res.send(lista)
    }
    catch(err){
        return res.status(400).send(err)
    }
})


/**
 * serviço que salva as permissões do login
 * deve ser enviado no corpo da requisição um json com o abaixo
 * {
 *   permissions:[idRule1,idRule2...]
 * }
 * o id do login deve ser enviado na url /permissions/{idlogin}/
 */
router.post('/permissions/:idlogin/',async(req,res) =>{
    try{
        //recebe os dados enviados e os atribui as suas devidas variaveis
        const permissions = req.body['permissions']
        const idLogin = req.params.idlogin
        let query = ""
        
        //cria uma unica query para ser enviada para o banco de dados
        for(let i = 0; i <permissions.length; i++){
            let q = `${query}INSERT INTO tbLoginRules(idRule,idLogin) VALUES (${permissions[i]},${idLogin});\n`
            query = q
        }
        //envia a query para o banco de dados
        const insert = await Promise.resolve(querys(query))
        //retorna um status para o cliente informando que os dados foram salvos
        return res.status(200).send({res:"alterações feitas"})
    }
    catch(err){
        return res.status(400).send({err:"houve algum erro nas alterações"})
    }
})



//serviço que apaga todas as permissões de determinado Login
// '/permissions/{idlogin}/'
router.delete('/permissions/:idlogin',async(req,res) =>{
    try{
        //recebe o idlogin enviado na url e atribui a variavel idlogin
        const idlogin = req.params.idlogin
        //envia a query para o banco de dados para apagar as permissões
        const delet = await Promise.resolve(querys(
            `DELETE FROM tbloginrules WHERE idlogin = ${idlogin};`
        ))
        //caso não ocorra nenhum erro o usuario recebera um satatuscode 200
        return res.status(200).send({res:"dados excluidos"})
    }
    catch(err){
        return res.status(400).send({err:"houve algum erro"})
    }
})


module.exports = app => app.use('/',router);