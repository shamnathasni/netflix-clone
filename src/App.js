import React from "react";
import NavBar from "./components/navbar/navBar";
import "./app.css"
import {Action , originals} from "./urls";
import Banner from "./components/Banner/Banner";
import Rowpost from "./components/Rowpost/Rowpost";


function App() {
return(
  <div className="App">
    <NavBar/>
    <Banner/>
    <Rowpost url={originals} title="Netflix Originals" />
    <Rowpost url={Action} title="Action" isSmall />
  </div>
)
  
}

export default App;
