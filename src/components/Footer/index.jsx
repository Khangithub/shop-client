import React from "react";
import { Row, Col } from "react-bootstrap";
import { backToTop } from "../../helpers/dom";
import "./_footer.scss";

export default function Index() {
  return (
    <>
      <div className="back-to-top-btn" onClick={backToTop}>
        <span>Back to top</span>
      </div>

      <Row className="footer-ct">
        <Row className="footer-layout">
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h4>Get to Know Us</h4>
            <p>Careers</p>
            <p>Blog</p>
            <p>About Amazon</p>
            <p>Investor Relations</p>
            <p>Amazon Devices</p>
            <p>Amazon Tours</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h4>Sell productList on Amazon</h4>
            <p>Sell apps on Amazon</p>
            <p>Become an Affiliate</p>
            <p>Advertise Your Products</p>
            <p>Self-Publish with Us</p>
            <p>Host an Amazon Hub</p>
            <p>›See More Make Money with Us</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h4> Amazon Payment Products</h4>
            <p>Amazon Business Card</p>
            <p>Shop with Points</p>
            <p>Reload Your Balance</p>
            <p>Amazon Currency Converter</p>
          </Col>
          <Col xs={12} sm={6} md={3} className="footer-section">
            <h4>Let Us Help You</h4>
            <p>Amazon and COVID-19</p>
            <p>Your Account</p>
            <p>Your Orders</p>
            <p>Shipping Rates & Policies</p>
            <p>Returns & Replacements</p>
            <p>Manage Your Content and Devices</p>
            <p>Amazon Assistant</p>
            <p> Help</p>
          </Col>
        </Row>
      </Row>
    </>
  );
}
