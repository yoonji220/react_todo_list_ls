import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Todo({ data }) {
  return (
    <div className="d-flex justify-content-between mb-2">
      <Form.Check // prettier-ignore
        type="checkbox"
        id={`todo-${data.id}`}
        label={data.title}
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
