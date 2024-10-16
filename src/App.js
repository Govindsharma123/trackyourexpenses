import Login from "./components/Login";
import { Route, Routes } from "react-router";


// import Home from "./components/Home";
import HomePage from "./Pages/HomePage";
import BudgetPage from "./Pages/BudgetPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element = {<HomePage/>}/>
        <Route path='/budget' element = {<BudgetPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
