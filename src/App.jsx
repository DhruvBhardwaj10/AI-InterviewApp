
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import InterviewPage from "./components/InterviewPage";
import InterviewStart from "./components/InterviewStart";
import UserFeedBack from "./pages/UserFeedBack";
import HomePage from "./pages/HomePage";
import Footer from "./pages/Footer"
import About from "./pages/About";
export default function App() {
  return (
   <div className="bg-slate-900">
     <NavBar/>
     {/* <Home/> */}
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/dashboard/interview/:mockId" element={<InterviewPage />}/>
      <Route path="/dashboard/interview/:mockId/start" element={<InterviewStart/>}/>
      <Route path="/dashboard/interview/:mockId/feedback" element={<UserFeedBack/>}/>
      
     </Routes>
     <Footer/>
 

  </div>




  );
}