const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const mysql=require('mysql')
const add=express()
add.use(cors())
add.use(bodyparser.json())
add.use(express.json())
add.use(bodyparser.urlencoded({extended:true}))
add.use(express.static('public'))

let con=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"root12345",
    database:"todo"
})
con.connect(function(error){
    if(error){
        console.log(error)
    }else{
        console.log("Database is success full connect")
    }
})
add.post('/api/v1/register',(request,response)=>{
    let {email,name,password}=request.body
    let sql='insert into user(name,email,password)values(?,?,?)';
    con.query(sql,[name,email,password],(error,result)=>{
    if(error){
        var a={"status":"error"}
        response.send(a)
    }
    else{
        var a={"status":"success"}
        response.send(a)
    }
    })
})
//Login page username and password Checking 
add.post('/api/v1/login',(request,response)=>{
    let {email,password}=request.body;
    let sql ='select * from user where email=?';
    con.query(sql,[email],(error,result)=>{
        if(error){
            var a={"status":"error"}
            response.send(a)
        }
        else if(result.length>0){
            //password checking
            let username1 =result[0].email;
            let password1=result[0].password;
            let userid =result[0].userid;
            if (username1===email && password1==password ){
                let s={"status":"success","userid":userid};
                response.send(s);
                }else{
                    let s={
                        "status":'Invalid_data'
                    };
                    response.send(s);
                }
                }
            else{
                let s={"status":"Invalied"}
                response.send(s)
            }
            })
        }
        
    )
    add.post('/api/v1/register',(request,response)=>{
        let {email,name,password}=request.body
        let sql='insert into user(name,email,password)values(?,?,?)';
        con.query(sql,[name,email,password],(error,result)=>{
        if(error){
            var a={"status":"error"}
            response.send(a)
        }
        else{
            var a={"status":"success"}
            response.send(a)
        }
        })
    })
    add.post('/inserttask/:userid',(request,response)=>{
        let {userid} = request.params;
        let {task}=request.body
        let sql='insert into task(task,userid)values(?,?)';
        con.query(sql,[task,userid],(error,result)=>{
        if(error){
            var a={"status":"error"}
            response.send(a)
        }
        else{
            var a={"status":"success"}
            response.send(a)
        }
        })
    })
    //geting the user data for displaying the there page
add.get('/getdata/:userid',(request,response)=>{
    let{userid}=request.params
    let sql='select * from user where userid=?';
    con.query(sql,[userid],(error,result)=>{
        if(error){
            response.send(error)
        }
        else{
            response.send(result)
        }
    })
})
    //geting the user data for displaying the there page
    add.get('/gettask/:userid',(request,response)=>{
        let{userid}=request.params
        let sql='select * from task where userid=?';
        con.query(sql,[userid],(error,result)=>{
            if(error){
                response.send(error)
            }
            else{
                response.send(result)
            }
        })
    })
    add.listen(8000,()=>{
        console.log("port is running in 8000")
    })