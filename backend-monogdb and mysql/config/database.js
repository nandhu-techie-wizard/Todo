const mongoose =require('mongoose')

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true, 
         useUnifiedTopology : true
        }).then(con=>{
            console.log(`Connected to database Host: ${con.connection.host}`)
          })
          // .catch((err)=>{
          //   console.error("Error connecting to the Database")
          // })


}
module.exports =connectDatabase;