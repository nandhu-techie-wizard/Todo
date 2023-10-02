import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/home/Login';
import'bootstrap/dist/css/bootstrap.css'
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Register } from './components/home/Register';
import { Task } from './components/todo/task';
import { Updatask } from './components/todo/updatetask';
function App() {
  return (
<>
<BrowserRouter>
<Routes>
<Route path='/' element={<Login/>}/>
<Route path='/Register' element={<Register/>}/>
<Route path='/Task/:userid'element={[<Task/>]}/>
<Route path='/updatetask/:userid/:task_id'element={[<Updatask/>]}/>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;
