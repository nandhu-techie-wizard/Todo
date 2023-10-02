import React, { useEffect, useState } from "react";
import './task.css'
import { Link, useParams } from "react-router-dom";
import  { FaPen} from 'react-icons/fa'
import  AiFillDelete, { AiOutlineDelete } from 'react-icons/ai'
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
        let key={task_id:task_id}
        axios.post('http://localhost:8000/deletetask',key)
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
        <div className="mx-auto task_1 vh-100 ">
        <h3 className="text-white text-center pt-2">{name}</h3>
            <h5 className="text-white text-center">{email}</h5>
        <div className=" maincard mx-auto bg-white col-lg-6 mx-auto m-5 rounded-5 text-center py-2">

        
            <h1 className="todo ">TODO</h1><br/>
            <form onSubmit={handleSubmit}>
                 <div className="task rounded-5 mt-2 col-lg-4 mx-auto p-1">
                <input type="text" id="task" className="" />
                </div>
             <button type='submit'class="btn btn-primary mt-3">Add task </button></form>
             <h1 className="task2 ">TODO List</h1><br/>
        {items.map((value,index)=>(
        <>
        
        <div className="card taskcard mt-2 rounded-5 text-center  px-5">
        <h5 class="card-title">{value.task}</h5>
       <div className="text-end">
        <Link to= {`/updatetask/${value.userid}/${value.task_id}`}>
        <FaPen className="fw-bold icon  fs-6 mx-3"/> </Link>
       <AiOutlineDelete onClick={()=>{delet(value.task_id)}} className="text-danger icon  fs-6 fw-bold"/>
       </div>
        </div>

                    
        </>
                ))}
        </div>
 </div>
        </>

    )
}
