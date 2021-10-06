import React, { useReducer } from "react";
import Navbarr from "./components/Navbarr";
import { createContext } from "react";
import { reducer,initialState } from "./Reducer/useReducer";
import Routing from "./components/Routing";

export const UserContext=createContext();


const App = () => {
  const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <div>
     <UserContext.Provider value={{state,dispatch}}>
      <Navbarr />
      <Routing/>
      </UserContext.Provider>
      
    </div>
  );
};

export default App;
