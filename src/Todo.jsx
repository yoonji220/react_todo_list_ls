import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Todo({ data, checkUpdate, deleteTodo }) {
  const [isChecked, setIsChecked] = useState(data.checked);
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

  return (
    <div className="d-flex justify-content-between mb-2">
      <Form.Check // prettier-ignore
        type="checkbox"
        checked={data.checked}
        id={`todo-${data.id}`}
        label={data.title}
        onChange={handleChecked}
      />
      <div className="d-flex gap-2">
        <Button variant="secondary" size="sm">
          수정
        </Button>

        <Button variant="danger" size="sm" onClick={deleteItem}>
          삭제
        </Button>
      </div>
    </div>
  );
}
