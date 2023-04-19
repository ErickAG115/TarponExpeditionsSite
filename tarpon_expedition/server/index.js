const express = require('express');
const app = express();

async function conexion ()  {

    var mysql      = require('mysql2');
    var connection = mysql.createConnection({
        host: 'bcteezukfsohd8yhbppx-mysql.services.clever-cloud.com',
        user: 'udquvkqen4kw6eof',
        password: 'ouq9wA7QKYQ4PVRbRfHH',
        database: 'bcteezukfsohd8yhbppx',
        port:'3306'
    });

    connection.connect();
    
    const sqlSelect = "SELECT * from TipoUsuario";
    connection.query(sqlSelect,(err,result)=> {
        console.log(result);
    });
  }
  console.log(conexion())

app.get("/", (req,res) => {
    res.send("hello world");
})

app.listen(3001, () => {
    console.log("running on port 3001");
});