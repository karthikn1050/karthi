const express = require('express')
const app = express();
const cors = require("cors");
const mysql = require('mysql')
app.use(cors());


const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"Welcome#1",
    connectionLimit: 5,
    database:"vision"
})

db.getConnection(err => {
    if(err){
        throw err
    }
    console.log('MYSQL Connected')
})
app.get('/items',(req,res)=>{
    let sql ='select * from Items'
    db.query(sql,(err,results) =>{
        if(err){
            throw err
        }
        
        res.send(results);
    })
})
app.get('/status',(req,res)=>{
    let sql ='select Status from Items'
    db.query(sql,(err,results) =>{
        if(err){
            throw err
        }
        
        res.send(results);
    })
})


// Set up a port
const port = process.env.PORT || 5000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );