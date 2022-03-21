import React from "react";
import { Card, Accordion, Button, Badge } from "react-bootstrap";
import { NavBar } from "../components";
import "./_settings.scss";

function Settings({ currentUser, token }) {
  return (
    <>
      <NavBar currentUser={currentUser} token={token} />
      <div className="settings">
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                <b>Phone Number </b>
                {currentUser.phoneNumber === "" && (
                  <Badge variant="danger">Not Updated</Badge>
                )}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="phone-ct">
                  <select name="phone-code" id=""></select>
                  <input type="phonenumber" className="phone-number" />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </>
  );
}

export default Settings;
