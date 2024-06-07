const express = require("express")
const mongoose = require("mongoose")
const routers =require('./route');
// var routers = require('./routes/routes');
// const routes = require('./routes/index.js');
// const routers = require('/routes./index.js');
const bodyParser = require("body-parser")

const app = express()
const cors = require('cors');
const port = 5000;

const mongodatabaseURL ="mongodb+srv://komalkhalkar:Komal%40123@cluster0.6nzkkrg.mongodb.net/todoappdb?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongodatabaseURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection


app.listen(port,()=>{
    console.log("Server is running port" +port);
})


connection.once("open",()=>{
    console.log("MongoDb Connected!!!......")
});

app.use(cors());
app.use(bodyParser.json());
app.use(routers);