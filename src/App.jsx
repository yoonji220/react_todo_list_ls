import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "html 배우기", checked: false },
    { id: 2, title: "css 배우기", checked: false },
  ]);
  return (
    <>
      <div className="container">
        <h1>My todo App</h1>
        <Form>
          <Form.Group className="mb-3" controlId="todoInput">
            <Form.Label>할일 입력</Form.Label>
            <Form.Control type="text" placeholder="할일을 입력하세요." />
          </Form.Group>
          <Button variant="primary">입력</Button>
        </Form>
        <hr />
        {todo.map(item => {
          return <Todo data={item} />;
        })}
      </div>
    </>
  );
}

export default App;
