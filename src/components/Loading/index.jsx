import React from "react";
import { Spinner } from "react-bootstrap";

function index({ errMsg }) {
  return (
    <>
      <Spinner animation="grow" variant="danger" />
      <h5>{JSON.stringify(errMsg)}</h5>
    </>
  );
}

export default index;
