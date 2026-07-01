import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import formatDate, { getDDayInfo } from "./utils/date";

export default function Todo({ data, checkUpdate, deleteTodo, updateTodo }) {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [mode, setMode] = useState("read");
  const [title, setTitle] = useState(data.title);
  const [dueDate, setDueDate] = useState(data.due ? new Date(data.due) : null);
  const [memo, setMemo] = useState(data.memo || "");
  const [showMemo, setShowMemo] = useState(false);

  const toggleMemo = () => {
    setShowMemo(prev => !prev);
  };

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

  const dday = getDDayInfo(data.due);
  return (
    <>
      {mode === "read" ? (
        <div className="todo-item mb-3">
          <div className="d-flex justify-content-between align-items-start">
            <Form.Check
              type="checkbox"
              checked={data.checked}
              id={`todo-${data.id}`}
              label={data.title}
              onChange={handleChecked}
            />

            <div className="d-flex gap-2">
              <Button variant="secondary" size="sm" onClick={changeToEdit}>
                수정
              </Button>

              <Button variant="danger" size="sm" onClick={deleteItem}>
                삭제
              </Button>
            </div>
          </div>

          {data.due && (
            <small className={`todo-due ${dday.className}`}>
              만기일: {data.due} / {dday.text}
            </small>
          )}
          {data.memo && (
            <>
              <Button
                variant="link"
                size="sm"
                className="p-0"
                onClick={toggleMemo}
              >
                {showMemo ? "메모 접기" : "메모 보기"}
              </Button>

              {showMemo && <div className="todo-memo">{data.memo}</div>}
            </>
          )}
        </div>
      ) : (
        <Form
          onSubmit={e => {
            e.preventDefault();
            updateTodo(data.id, title, formatDate(dueDate), memo);
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
          <Form.Group className="mb-3" controlId={`todoMemo-${data.id}`}>
            <Form.Label>메모</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={memo}
              onChange={e => setMemo(e.target.value)}
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
