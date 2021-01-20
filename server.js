const express = require("express");
const morgan = require("morgan");
const { DefaultAzureCredential } = require("@azure/identity");
const { QueueServiceClient } = require("@azure/storage-queue");




app = express();
app.set("view engine","ejs");


app.listen(process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

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
        request.query('SELECT TOP (10) * FROM [SalesLT].[Customer]', function (err, recordset) {
            
            if (err) console.log(err)

           
            res.status(200).render("main",{data: JSON.stringify(recordset["recordsets"][0])});
            
        });
    });
	
	});
app.post("/", (req,res) => {
    var data = [req.body.idone,req.body.idtwo,req.body.idtri]
    for(var i = 0; i< 3;i++)
    {
        let buff = new Buffer(data[i]);
        data[i] = buff.toString('base64');
        console.log(data[i])
    }
    
      
    const connStr = "DefaultEndpointsProtocol=https;AccountName=saforcmpe363;AccountKey=qPXc94ZUxS/ebpRjnuWLVjLbfJ++PBEQsAqsUJG+iO45gCK67oA2FX+sBtGUq3nOEWI43T7So67MwHSNdeCS8A==;EndpointSuffix=core.windows.net";
 
    const queueServiceClient = QueueServiceClient.fromConnectionString(connStr);
 
    
 
const queueName = "queueforcustomerid";
 
async function main() {
  const queueClient = queueServiceClient.getQueueClient(queueName);
  // Send a message into the queue using the sendMessage method.
 
  for(var i = 0; i< 3;i++) var sendMessageResponse = await queueClient.sendMessage(data[i]);
  res.send(
    `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
  );
    }
 
    main();
})






