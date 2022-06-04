import React, { useContext, useState } from "react";
import { NavBar, Title } from "../components";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import firebase, { auth } from "../config/firebase";
import { UserCtx } from "../context/user.context";
import "./_settings.scss";
import { chgUserAvtRq } from "../actions/user";

function Settings() {
  const dispatch = useDispatch();
  const { currentUser, token, avtChange } = useContext(UserCtx);
  const [avt, setAvt] = useState(currentUser.avatar);

  // const [phoneNumber, setPhoneNumber] = useState({
  //   number: "",
  //   code: "",
  // });

  // const [phoneVeriModalShow, setPhoneVeriModalShow] = useState(false);

  // const configureCaptcha = () => {
  //   return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha",
  //     {
  //       size: "invisible",
  //       callback: (_) => {
  //         handlePhoneVerification();
  //         console.log("Recaptca varified");
  //       },
  //       defaultCountry: "VN",
  //     }
  //   ));
  // };

  // const handlePhoneVerification = async () => {
  //   try {
  //     configureCaptcha();
  //     const phone = "+" + phoneNumber.code + phoneNumber.number;
  //     const appVerifier = window.recaptchaVerifier;
  //     await auth.signInWithPhoneNumber(phone, appVerifier);
  //   } catch (err) {
  //     throw new Error(err.toString());
  //   }
  // };

  return (
    <>
      <NavBar />
      {/* 
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
      <button onClick={handlePhoneVerification}>Send Verification Code</button>

      <div id="recaptcha"></div> 
       <Modal
                  show={phoneVeriModalShow}
                  onHide={() => setPhoneVeriModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                
                </Modal> */}
      <div className="settings">
        <Row>
          <Col md={12} lg={4}>
            <Title>Profile</Title>
            <Title>Password</Title>
          </Col>
          <Col md={12} lg={8}>
            <div className="chg-avt-ct">
              <img src={avt} alt="user-avt" draggable={false} />
              <form encType="multipart/form-data">
                <input
                  name="chg-avt"
                  id="chg-avt"
                  disabled={avtChange}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const { files } = e.target;
                    if (files.length === 1) {
                      setAvt(URL.createObjectURL(files[0]));
                      dispatch(chgUserAvtRq({ file: files[0], token }));
                    }
                  }}
                />
                <label htmlFor="chg-avt">
                  <h3>{avtChange ? "Pending Change" : "Change"}</h3>
                </label>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Settings;
