import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Image, Badge, NavDropdown } from "react-bootstrap";
import { removeAscent } from "../../helpers";
import { getOrdersRequest } from "../../actions/order";

import logoSvg from "../../assets/svgs/logo.svg";
import searchSvg from "../../assets/svgs/search.svg";
import cartSvg from "../../assets/svgs/cart.svg";

import "./_navbar.scss";

function NavBar({ currentUser, token }) {
  const history = useHistory();
  const dispatch = useDispatch();
  let [input, setInput] = useState("");

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (token) {
      dispatch(getOrdersRequest({ token }));
    }
  }, [dispatch, token]);

  const handleSearch = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/search/1",
      search: `?keyword=${removeAscent(input)}`,
      state: { input },
    });
  };

  return (
    <div className="navbar-container">
      <div className="navbar-layout">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <Image className="navbar-icon" src={logoSvg} alt="logo" rounded />
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {/* <Nav.Link href="/productList/1">
                <Image
                  className="navbar-icon"
                  src={productSvg}
                  alt="productSvg"
                />
              </Nav.Link> */}

              {/* {currentUser && currentUser.role !== "client" && (
                <AddProductBtn />
              )} */}
            </Nav>

            <form className="navbar-searchbox" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Find the product you want..."
                name="keyword"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                autoFocus
              />

              <img onClick={handleSearch} src={searchSvg} alt="search-icon" />
            </form>

            {token ? (
              <NavDropdown
                className="setting-dropdown"
                title={
                  <img
                    className="setting-user-avatar"
                    src={currentUser.avatar}
                    alt="user-avatar"
                  />
                }
              >
                <NavDropdown.Item href="/personalize">Setting</NavDropdown.Item>

                <NavDropdown.Item
                  className="setting-dropdown-user-btn"
                  href="/login"
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <button
                className="login_btn"
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            )}
            {token && (
              <Nav.Link href="/orders">
                <Image src={cartSvg} className="navbar-icon" alt="cartSvg" />
                <Badge variant="danger">{orders.length}</Badge>
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
