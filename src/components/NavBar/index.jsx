import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { Navbar, Nav, Image, Badge } from "react-bootstrap";
import { removeAscent } from "../../helpers";
import { getCurrentUserRequest } from "../../actions/user";
import { getOrdersRequest } from "../../actions/order";

import logoSvg from "../../assets/svgs/logo.svg";
import searchSvg from "../../assets/svgs/search.svg";
import cartSvg from "../../assets/svgs/cart.svg";

import SettingDropdown from "./SettingDropdown";
import Loading from "../Loading";

import "./_navbar.scss";

function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  let [input, setInput] = useState("");

  const { currentUser, token, userLoading, userErr } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (!isEmpty(token)) {
      dispatch(getOrdersRequest({ token }));
    }
  }, [dispatch, token]);

  if (isEmpty(currentUser)) return <Loading />;
  if (userLoading) return <Loading />;
  if (!isEmpty(userErr)) return <Loading />;

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
                placeholder="Tìm sản phẩm bạn mong muốn ..."
                name="keyword"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                autoFocus
              />

              <img onClick={handleSearch} src={searchSvg} alt="search-icon" />
            </form>

            <SettingDropdown
              currentUser={currentUser}
              userErr={userErr}
              userLoading={userLoading}
            />

            <Nav.Link href="/orders">
              <Image src={cartSvg} className="navbar-icon" alt="cartSvg" />
              <Badge variant="danger">{orders.length}</Badge>
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
