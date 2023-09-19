import React from "react";

import CreateTodo from "./components/create_todo";
import ShowTodos from "./components/todo_list";

const App = () => {
 return (
   <div>
    <CreateTodo />
    <ShowTodos />
   </div>
 );
};
 
export default App;