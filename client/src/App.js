import React from "react";
import { Route, Routes } from "react-router-dom";

//Custom components
import CreateTodo from "./components/create_todo";
import ShowTodos from "./components/todo_list";
import EditTodo from "./components/edit_todo";

const App = () => {
 return (
   <div>
    <CreateTodo />
    <ShowTodos />
    <Routes>
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
   </div>
 );
};
 
export default App;