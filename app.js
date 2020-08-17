const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const {db} = require('./src/db/db')


const app = express();

const port = 3000;
const host = "0.0.0.0"

db.connect()

app.use(bodyParser.json())
app.use(cors())
require('./src/controllers/System')(app)
require('./src/controllers/login')(app)
require('./src/controllers/rules')(app)


app.listen(port,host);