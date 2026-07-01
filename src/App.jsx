import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useMemo, useRef } from "react";
import Todo from "./Todo";

function App() {
  const [todo, setTodo] = useState([
    { id: 1, title: "html 배우기", checked: false },
    { id: 2, title: "css 배우기", checked: false },
  ]);

  const inputRef = useRef(null);

  const nextId = useMemo(() => {
    const maxId = todo.reduce((acc, current) => {
      return Math.max(acc, current.id);
    }, 0);

    return maxId + 1;
  }, [todo]);

  const addTodo = title => {
    const newTodo = {
      id: nextId,
      title,
      checked: false,
    };

    setTodo(prev => [...prev, newTodo]);
  };

  const checkUpdate = (_id, _value) => {
    /*_id와 일치하는 요소의 checked 속성의 값을 _value로 변경 todo도 업데이트 */
    setTodo(prev =>
      prev.map(item => (item.id === _id ? { ...item, checked: _value } : item)),
    );
  };

  const deleteTodo = _id => {
    setTodo(prev => prev.filter(item => item.id !== _id));
  };

  const updateTodo = (_id, _title) => {
    setTodo(prev =>
      prev.map(item => (item.id === _id ? { ...item, title: _title } : item)),
    );
  };
  return (
    <>
      <div className="container">
        <h1>My todo App</h1>
        <Form
          onSubmit={e => {
            e.preventDefault();
            addTodo(e.target.todo.value);
            inputRef.current.value = "";
          }}
        >
          <Form.Group className="mb-3" controlId="todoInput">
            <Form.Label>할일 입력</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              name="todo"
              placeholder="할일을 입력하세요."
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            입력
          </Button>
        </Form>
        <hr />
        {todo.map((item, idx) => {
          return (
            <Todo
              key={idx}
              data={item}
              checkUpdate={checkUpdate}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
