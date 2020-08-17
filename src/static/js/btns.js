
/**
 * função responsavel por alterar todas as permissões do login,
 * basta enviar o estado desejado, true, ou false
 */
function alterarTodas(state){
    let checks = document.getElementsByClassName("check-permission")
    let idlogin = document.getElementById('idlogin')
    
    if(checks != null && idlogin.value != ""){
        for(let i = 0; i < checks.length; i++){
            checks[i].checked = state
        }
    }
}



//função responsvel por salvar as permissões dos logins
function salvar(){
    let checks = document.getElementsByClassName("check-permission")
    let idlogin = document.getElementById('idlogin').value
    let permissions = []
    let url = baseUrl + "permissions/" + idlogin + "/"
    addEventListener("",event =>{
        event.preventDefault();
    })
    //faz uma lista com as novas permissões do usuario
    if(idlogin != "" && checks != null){
        for(let i = 0; i < checks.length; i++){
            if(checks[i].checked){
                permissions.push(checks[i].name)
            }
        }


        //primeiro apaga todas as permissões atuais e depois salva as novas permissões
        fetch(url,{method:'DELETE'}).then(response => response.json())
        .then(response => {
            if(response['res']){
                //dados com as novas permissões do login
                let data = {permissions:permissions}
                //envia para a api os novos dados
                fetch(url,{
                    method:'POST',
                    body:JSON.stringify(data),
                    headers:{
                        "Content-Type":"application/json"
                    }
                }).then(function(response){
                    return response.json()
                }).then(function(response){
                    if(response['res']){
                        alert("Dados Alterados com sucesso")
                    }
                    else{
                        alert("houve um proble com os dados e não foram salvos")
                    }

                })
            }
            
        })

        
    }
    
}