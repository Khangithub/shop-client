import React from "react";
import { Row, Button, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Pagination({ title, to, index, total }) {
  const history = useHistory();

  return (
    <div className="Products">
      <Row style={{ margin: "25px" }}>
        <Col style={{ textTransform: "uppercase", color: "gray" }}>{title}</Col>

        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          {index < 1 ? history.goBack() : ""}

          <Link to={`${to}/1`}>
            <Button variant="light" style={{ color: "#6c757d" }}>
              1
            </Button>
          </Link>
          <Link to={`${to}/${index - 1}`}>
            <Button variant="light" style={{ color: "#6c757d" }}>
              ◀◀
            </Button>
          </Link>
          <Link to={`${to}/${index}`}>
            <Button variant="outline-secondary">{index}</Button>
          </Link>
          <Link to={`${to}/${index + 1}`}>
            <Button variant="light" style={{ color: "#6c757d" }}>
              ▶▶
            </Button>
          </Link>
          <Link to={`${to}/${total}`}>
            <Button variant="light" style={{ color: "#6c757d" }}>
              {total}
            </Button>
          </Link>
          {index > total ? history.goBack() : ""}
        </Col>
      </Row>
    </div>
  );
}