import React, { useState } from "react";
import { Card, Accordion, Button, Badge } from "react-bootstrap";
import { NavBar } from "../components";
import phoneCodes from "country-calling-code";
import "./_settings.scss";
import firebase, { auth } from "../config/firebase";

function Settings({ currentUser, token }) {
  const [phoneNumber, setPhoneNumber] = useState({
    number: "",
    code: "",
  });

  // const [phoneVeriModalShow, setPhoneVeriModalShow] = useState(false);

  const configureCaptcha = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (_) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          handlePhoneVerification();
          console.log("Recaptca varified");
        },
        defaultCountry: "VN",
      }
    ));
  };

  const handlePhoneVerification = async () => {
    try {
      configureCaptcha();
      const phone = "+" + phoneNumber.code + phoneNumber.number;
      const appVerifier = window.recaptchaVerifier;
      await auth.signInWithPhoneNumber(phone, appVerifier)
    } catch (err) {
      throw new Error(err.toString());
    }
  };

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
                  <div className="phone-code-ct">
                    <label htmlFor="phone-code">
                      <b>Phone Code:&nbsp;</b>
                    </label>
                    <select
                      name="phone-code"
                      id="phone-code"
                      defaultValue="Vietnam (84)"
                      onChange={(e) =>
                        setPhoneNumber({ ...phoneNumber, code: e.target.value })
                      }
                    >
                      {phoneCodes.map(({ country, countryCodes }) => (
                        <option value={countryCodes[0]} key={country}>
                          {country} ({countryCodes[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="phonenumber-ct">
                    <label htmlFor="phonenumber">
                      <b>Phone Number: &nbsp;</b>
                    </label>
                    <input
                      type="tel"
                      name="phonenumber"
                      id="phonenumber"
                      value={phoneNumber.number}
                      onChange={(e) => {
                        setPhoneNumber({
                          ...phoneNumber,
                          number: e.target.value,
                        });
                      }}
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    />
                  </div>
                  <button onClick={handlePhoneVerification}>
                    Send Verification Code
                  </button>

                  <div id="recaptcha"></div>
                </div>

                <small>
                  Your phone code will replace the very first number of your
                  phonenumber. For example, if your phone code is +84 and your
                  number is 0987654321 then select your phone code and just type
                  987654321 to phonenumber input (remove the first "0" of your
                  phonenumber)
                </small>

                {/* <Modal
                  show={phoneVeriModalShow}
                  onHide={() => setPhoneVeriModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                
                </Modal> */}
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
