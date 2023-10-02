import axios from "axios";
import './task.css'
import React,{useState,useEffect} from "react";
import { Link  ,useParams} from "react-router-dom";
export const Updatask=()=>{
    var {userid}=useParams()
    var{task_id}=useParams()
    const[task,setTask]=useState("")

useEffect(()=>{
    fetch("http://localhost:8000/gettask/id/"+task_id)
    .then(response=> response.json())
    .then((res)=>{
        setTask(res[0].task)
    })
  },[])
  const handleupdatetask=(event)=>{
    event.preventDefault()
    var key={
      "task":task
    }
        axios.put("http://localhost:8000/updatetask/"+task_id,key)
        .then(function (res){
            if(res.data.status==="error"){
                alert('Error not upadte')
            }
            else if(res.data.status === "success"){
                alert("the value are updated")
                window.location.href=`/Task/${userid}`;
            }
    })
    }
    return(<>
            <div className="mx-auto task_1 vh-100 ">
        <div className=" maincard mx-auto bg-white col-lg-6 mx-auto  rounded-5 text-center p-5">
            <h1 className="todo ">TODO</h1><br/>
            <form onSubmit={handleupdatetask}>
                 <div className="task rounded-5 mt-3 col-lg-4 mx-auto p-1">
                <input type="text" id="task" className="" value={task} onChange={(a)=>{setTask(a.target.value)}}  />
                </div>
             <button type='submit'class="btn btn-primary mt-3">Upadte task </button></form>
        </div>
 </div>
    </>)
}