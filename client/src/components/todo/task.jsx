import React, { useEffect, useState } from "react";
import './task.css'
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const Task=()=>{

    var {userid}=useParams()
    const [name,setName]= useState("")
    const [email,setEmail] = useState("")
    useEffect(()=>{
        fetch("http://localhost:8000/getdata/"+userid)
        .then(response=> response.json())
        .then((res)=>{
            setName(res[0].name)
            setEmail(res[0].email)
        })
    },[])
    const[items,setItems]=useState([])
    useEffect(()=>{
      fetch("http://localhost:8000/gettask/"+userid)
      .then((res) => res.json())
      .then((data)=> setItems(data))
  })
    const handleSubmit=async()=>{
        var task=document.getElementById("task").value
        console.log(task)
        var key={

          "task":task
        }
        if(task==''){
          alert("please fill task")
          }else{
          await axios.post("http://localhost:8000/inserttask/"+userid,key)
          .then((res)=>{
            if(res.data.status==="error"){
              alert("data is not insert")
            }else if(res.data.status==="success"){
              alert("data is inserted")
            }
          })
        }
      }
      function delet(task_id){
        let key={service_id:service_id}
        axios.post('http://localhost:8000/deleteservice',key)
        .then(function(res){
            if(res.data.status ==="error"){
                alert("Data is not del")
            }
            else if(res.data.status === "success"){
                alert("Data is deleted")
            }
    })
    }
    return(
        <>
        <div className="container hello">
        <div className="col-lg-3 align-self-start mt-5 p-5 position-sticky bg-white text-center rounded-5"> 
      <h3>{name}</h3>
      <h5>{email}</h5>
                  <div className="card-body ">
            {/* <Link to={`/updatedetails/${userid}`}><button className="btn btn-success ms-3" >update</button></Link> */}
               </div>           

                
        </div>
        <div className="mx-auto">
            <h1>Task</h1><br/>
            <form onSubmit={handleSubmit}> 
                <input type="text" id="task" />
                <button type='submit'class="btn btn-primary">Add task </button></form>
        {items.map((value,index)=>(
        <>
          <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{value.task}</h5>
        <button className="btn btn-danger ms-4" onClick={()=>{delet(value.task_id)}}>Delete</button>
      
      </div>
    </div>
  </div>
                    
        </>
                ))}
        </div>
 </div>
        </>

    )
}
