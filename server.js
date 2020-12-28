const express = require("express");
const morgan = require("morgan");



//dadad

app = express();
app.set("view engine","ejs");

app.get("/", (req,res) => {
	var sql = require("mssql");

    // config for your database
    var config = {
        user: "admin363",
        password: "Password363!",
        server: "cmpe363-sql.database.windows.net", 
        database: "sqldb1"
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('SELECT TOP (100) * FROM [SalesLT].[Customer]', function (err, recordset) {
            
            if (err) console.log(err)

           
            res.send("<h1>Arda Saridogan</h1>" +
	"<p>118200062</p>" + "<hr>" + "<h3> data requested in assigment </h3>" + JSON.stringify(recordset["recordsets"][0]));
            
        });
    });
	
	});









app.listen(8080);

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


