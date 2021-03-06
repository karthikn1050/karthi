const express = require("express");
const cors = require("cors");
const mysql = require("mysql")
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });
const dbs = mysql.createPool({
  host: "localhost",
  user:"root",
  password:"Welcome#1",
  connectionLimit: 5,
  database:"vision"
})

dbs.getConnection(err => {
  if(err){
      throw err
  }
  console.log('MYSQL Connected')
})
app.get('/items',(req,res)=>{
  let sql ='select * from Items'
  dbs.query(sql,(err,results) =>{
      if(err){
          throw err
      }
      
      res.send(results);
  })
})
app.get('/userlist',(req,res)=>{
  let sql ='select * from users where id NOT IN(select id from users where username="adminn");'
  dbs.query(sql,(err,results) =>{
      if(err){
          throw err
      }
      
      res.send(results);
  })
})
app.delete('/delete/:id',(req,res)=>{
  const id= req.params.id
  dbs.query("DELETE FROM users WHERE ID =?",id,(err,results) => {
    if(err){
        throw err
    }
    
    res.send(results);
})
})
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dhvani application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
