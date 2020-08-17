/**
 * toda vez que o usuario selecionar um systema esta função retornara
 * uma lista com todas as permissões disponiveis naquele sistema
 */
function listRulesSystems(id){
    const url = baseUrl + "systems/" + id;
    

    addEventListener("",event =>{
        event.preventDefault();
    })

    //consulta na api todas as permissões do sistema selecionado
    fetch(url,{method:'GET'}).then(response => response.json())
    .then(response =>{
        
        //apaga a antiga lista de permissões
        let itemsListaAntiga = document.querySelector(".lista-permissoes-item")
        while(itemsListaAntiga != null){
            itemsListaAntiga.remove()
            itemsListaAntiga = document.querySelector(".lista-permissoes-item")
        }

        const lista = document.querySelector(".lista-permissoes")

        //cria cada permissão da lista de permissões do sistema
        for(let i = 0; i < response.length; i++){
            let li = document.createElement("li")
            let input = document.createElement("input")
            let span = document.createElement("span")
            input.type = "checkbox"
            input.className = "check-permission"
            input.id = "rule-" + response[i]['idrule']
            input.name = response[i]['idrule']
            li.className = "lista-permissoes-item"
            span.innerHTML = response[i]['rulename']
            li.appendChild(input) 
            li.appendChild(span)
            lista.appendChild(li)
        }
    })


    /**
     * caso tenha algum login selecionado, efetua uma busca na api 
     * para ver quais permissões este login possui no sistema informado
     */
    let idlogin = document.getElementById('idlogin')
    if(idlogin.value != ""){
        getPermissions(id,idlogin.value)
    }
}

// efetua uma pesquisa pelo nome do usuario ou o login
function pesquisarLogin(){
    alterarTodas(false)
    let pesquisa = document.getElementById("input-pesquisa").value
    const url = baseUrl + "login/?search=" + pesquisa;
    let itens = document.querySelector(".usuario")
    //let itens = document.getElementsByClassName("usuario")
    addEventListener("",event =>{
        event.preventDefault();
    })
    
    fetch(url,{method:'GET'}).then(response => response.json())
    .then(response =>{

        //remove a lista da antiga pesquisa
        while(itens != null){
            itens.remove()
            itens = document.querySelector(".usuario")
        }
        

        //cria uma lista com todos os logins encontrados referentes a pesquisa
        const lista = document.querySelector(".lista-usuarios")
        for(let i = 0; i < response.length; i++){
            let li = document.createElement("li")
            let span = document.createElement("span")
            li.className = "usuario"
            span.innerHTML = response[i]['nome']

            //campo em que indica oque acontecera quando o login for selecionado
            li.onclick = ()=> {
                document.getElementById("input-pesquisa").value = response[i]['nome']
                let sistema = document.getElementById("sistemas")
                document.getElementById("idlogin").value = response[i]['idlogin']
                //esconde a linha de alerta para selecionar um usuario
                info = document.getElementById('info').style.display  = "none"


                /*Caso possua algum sistema selecinaodo, é feita uma busca para 
                ver quais permissões o login selecionado possui neste respectivo sistema */
                if(sistema.value != ""){
                    getPermissions(
                        sistema.value,
                        response[i]['idlogin']
                    )
                }
            }
            li.innerHTML = response[i]['nome']
            lista.appendChild(li)

        }
    })

    /*limpa o campo de pesquisa e outros campos devido 
    ha não haver nehum login selecionado*/
    document.getElementById("input-pesquisa").value = ""
    idLogin = document.getElementById('idlogin').value = ""
    idLogin = document.getElementById('info').style.display  = "block"
    

}


//quando o usuario é selecionado
function getPermissions(idsystem,idlogin){
    //informa o input hiden qual o id do login selecionado

    let url = baseUrl + "permissions/" + idlogin + "/" + idsystem + "/"
    
    fetch(url,{method:'GET'}).then(response => response.json())
    .then(response =>{
        let loginRules = []
        let systemRules = []

        /**
         * transfere cada o id de cada permissão que o usuario 
         * possui para a variavel loginRules
         */
        for(let i = 0; i < response['login']['permissions'].length; i++){
            loginRules.push(response['login']['permissions'][i]['idrule'])
        }


        /**
         * transfere o idrule de cada permissão do sistema 
         * para a variavel systemRules
         */
        for(let i = 0; i < response['systemRules'].length; i++){
            systemRules.push(response['systemRules'][i]['idrule'])
        }

        //desmarca todos os checkbox da da tela
        for(let i = 0; i < systemRules.length; i++){
            let input = document.getElementById("rule-" + systemRules[i] )
            if(input != null){
                input.checked = false
            }
        }
        

        //marca na lista de permissões todas as permissões que o usuario possui
        for(let i = 0; i < systemRules.length; i++){
            let check = loginRules.indexOf(systemRules[i])
            if(check != -1){
                let input = document.getElementById("rule-" + systemRules[i] )
                if(input != null){
                    input.checked = true
                }
            }
            
        }
        
    })
}





