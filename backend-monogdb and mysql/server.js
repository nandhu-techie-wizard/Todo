const app=require('./app')
const dotenv =require("dotenv");
const path =require('path');

const connectDatabase = require('./config/database');
const { log } = require('console');
dotenv.config({path:path.join(__dirname,"config/config.env")});
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server Running to port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})

//unhandled Rejection Error
process.on('unhandledRejection',(err)=>{
    console.log(`error:${err.message}`);
    console.log('shutting down the server due to unhandled rejection')
    server.close(()=> {
        console.log('server closed gracefully')
        process.exit(1);
       
    })
})
//uncaught Exception
process.on('uncaughtException',(err)=>{
    console.log(`error:${err.message}`);
    console.log('shutting down the server due to uncaught Exception')
    server.close(()=> {
        console.log('server closed gracefully')
        process.exit(1);
       
    })
})
