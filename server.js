require('dotenv').config();
const express = require('express');
const Error = require('./middleware/error-miidleware');
const pool = require('./MysqlFolder/sqlpooling');
const route = require('./RouterFolder/authrouter');
const router = require('./RouterFolder/servicerouter');
const cors = require('cors');
var corsOptions = {
    origin:'http://localhost:3001',
    methods:"GET,POST, PUT, DELETE, PATCH , HEAD",
    credentials:true,
};



const app = express();


app.use(express.json(corsOptions));
app.use(cors());

app.use('/user',route);
app.use('/service',router);
app.use(Error);
PORT = 3000;


pool.query('SELECT 1').then(()=>{
    
    app.listen(PORT,()=>{
        console.log("Connect Successfully port number ", PORT);
    });
}).catch(()=>{
    console.log("Error in Sql Server");
});