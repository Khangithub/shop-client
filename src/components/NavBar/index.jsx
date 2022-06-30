import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Navbar, Nav, Image, Badge, NavDropdown } from "react-bootstrap";
import { removeAscent } from "../../helpers/string";

import { logoSvg, searchSvg, cartSvg } from "../../assets";

import "./_navbar.scss";
import { UserCtx } from "../../context/userCtx";
import { getOrdersAction } from "../../actions/order";

function NavBar() {
  const { currentUser, token } = useContext(UserCtx);
  const history = useHistory();
  const dispatch = useDispatch();
  let [input, setInput] = useState("");

  const { orders } = useSelector(({ order }) => order);

  useEffect(() => {
    if (token) {
      dispatch(getOrdersAction({ token }));
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
                <NavDropdown.Item href="/settings">Setting</NavDropdown.Item>

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
            {!!currentUser && (
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

export default React.memo(NavBar);
