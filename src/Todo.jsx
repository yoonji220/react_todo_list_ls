import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "./utils/date";

export default function Todo({ data, checkUpdate, deleteTodo, updateTodo }) {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [mode, setMode] = useState("read");
  const [title, setTitle] = useState(data.title);
  const [dueDate, setDueDate] = useState(data.due ? new Date(data.due) : null);

  const handleChecked = () => {
    const value = !isChecked;
    //setIsChecked(value)
    setIsChecked(prev => !prev);
    checkUpdate(data.id, value);
  };

  const deleteItem = () => {
    if (window.confirm("정말 삭제할까요?")) {
      deleteTodo(data.id);
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

  const changeToEdit = () => {
    setMode("edit");
  };
  const changeToRead = () => {
    setMode("read");
  };
  const handleChange = e => {
    setTitle(e.target.value);
  };

  const getDDayInfo = due => {
    if (!due) return { text: "", className: "" };

    const today = new Date();
    const dueDate = new Date(due);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 3) {
      return { text: `D-${diffDays}`, className: "" };
    }

    if (diffDays > 0) {
      return { text: `D-${diffDays}`, className: "due-soon" };
    }

    if (diffDays === 0) {
      return { text: "D-Day", className: "due-today" };
    }

    return { text: `D+${Math.abs(diffDays)}`, className: "due-over" };
  };

  const dday = getDDayInfo(data.due);
  return (
    <>
      {mode === "read" ? (
        <div className="d-flex justify-content-between mb-2">
          <Form.Check // prettier-ignore
            type="checkbox"
            checked={data.checked}
            id={`todo-${data.id}`}
            label={data.title}
            onChange={handleChecked}
          />
          {data.due && (
            <small className={dday.className}>
              만기일: {data.due} / {dday.text}
            </small>
          )}
          <div className="d-flex gap-2">
            <Button variant="secondary" size="sm" onClick={changeToEdit}>
              수정
            </Button>

            <Button variant="danger" size="sm" onClick={deleteItem}>
              삭제
            </Button>
          </div>
        </div>
      ) : (
        <Form
          onSubmit={e => {
            e.preventDefault();
            updateTodo(data.id, title, formatDate(dueDate));
            setMode("read");
          }}
        >
          <Form.Group className="mb-3" controlId="todoInput">
            <Form.Control
              type="text"
              name="todo"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={`todoDue-${data.id}`}>
            <Form.Label>만기일</Form.Label>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={dueDate}
              onChange={date => setDueDate(date)}
              className="form-control"
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" size="sm">
              저장
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={changeToRead}
            >
              취소
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}
