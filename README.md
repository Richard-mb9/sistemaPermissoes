Este é um exemplo simples de permissões de usuarios<br>
para iniciar ele primeiro monte a imagem do banco de dados usando o dockerfile  localizado na pasta /src/db. <br>

após isso monte a imagem da app com o dockerfile localizado na pasta raiz <br>

é importante primeiro inciar o banco de dados antes da app, usando o redirecionamento de portas para a porta 5432 (-p 5432:5432), caso prefira utilizar oura porta as configurações de comunicação se encontram no arquivo db.js na pasta /src/db, e necessario tambem antes de iniciar a app verificar o host do banco de dados no mesmo arquivo db.js, e tambem o a url base da api, que sera o host do container que ela ira  executar, para configurar a url base da api va até a pasta /src/static e altere a variavel baseUrl para o host do container da api<br>

para executar a imagem da api usar o redirecionamento das portas 3333 e 3000 da seguinte forma (-p 3333:3333 -p 3000:3000)<br>

após todos os serviços iniciados corretamente basta acessar pelo navegador o host do container da app pela porta 3333, EXEMPLO http://192.168.99.100:3333 <br>

