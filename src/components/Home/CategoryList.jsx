import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';

import '../_components.scss';

import bookSvg from '../../assets/svgs/book.svg';
import phoneSvg from '../../assets/svgs/phone.svg';
import foodSvg from '../../assets/svgs/food.svg';
import shippingSvg from '../../assets/svgs/shipping.svg';
import {useHistory} from 'react-router-dom';

function CategoryList() {
  const history = useHistory();

  return (
    <div className="category">
      <Container className="container-fluid">
        <Row className="category-card-list">
          {[
            {name: 'book', icon: bookSvg},
            {name: 'technology', icon: phoneSvg},
            {name: 'food', icon: foodSvg},
          ].map((category, index) => (
            <Col
              key={index}
              xs={12}
              sm={6}
              md={3}
              onClick={() => history.push(`/productList/${category.name}/1`)}
            >
              <div className="category-card-container">
                <h4 className="category-card-name">{category.name}</h4>
                <Image
                  src={category.icon}
                  alt="icon"
                  className="category-card-image"
                />
                <small className="category-card-link">See more</small>
              </div>
            </Col>
          ))}
          <Col xs={12} sm={6} md={3}>
            <div className="signin-container">
              <div className="signin-container-signin-btn">
                <h5>Sign in for the best experience</h5>
                <button onClick={() => history.push('/login')}>
                  Sign in securely
                </button>
              </div>

              <div className="shipping-img">
                <Image
                  src={shippingSvg}
                  alt="shipping-icon"
                  className="category-img"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CategoryList;
