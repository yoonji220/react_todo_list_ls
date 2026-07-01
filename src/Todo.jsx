import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Todo({ data }) {
  const [isChecked, setIsChecked] = useState(data.checked);
  const handleChecked = () => {
    setIsChecked(prev => !prev);
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

        <Button variant="danger" size="sm">
          삭제
        </Button>
      </div>
    </div>
  );
}
