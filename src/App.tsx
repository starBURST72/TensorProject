import React,{useState} from 'react';
import './styles/App.css';
import {ElementsList} from "./components/ElementsList/ElementsList";
import Header from "./components/Header/Header";

function App() {
    // const [collapsed, setCollapsed] = useState(false);
    //
    // const toggleCollapse = () => {
    //     setCollapsed(!collapsed);
    // };
  return (
      <>
        <Header/>

          <h1>Hello, world!</h1>
          <ElementsList/>
      </>
  );
}

export default App;
