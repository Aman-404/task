import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './components/SignIn'
import { Home } from './components/admin/Home';
import { CreateUser } from './components/admin/CreateUser';
import { CreateTask } from './components/admin/CreateTask';
import { InProcess } from './components/admin/taskDetails/InProcess';
import { Main } from './components/users/Main'
import { Pannding } from './components/users/Pannding'
import { Completed } from './components/users/Completed'
import { Process } from './components/users/Process'
import { TaskDetail } from './components/admin/taskDetails/TaskDetail';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path="home" element={<Home />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="createtask" element={<CreateTask />} />
          <Route path="inprocess" element={<InProcess />} />
          <Route path="main" element={<Main />} />
          <Route path="pannding" element={<Pannding />} />
          <Route path="completed" element={<Completed />} />
          <Route path="process" element={<Process />} />
          <Route path="taskdetails" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
