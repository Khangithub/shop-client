import React, { useContext, useState } from "react";
import "./_navbar.scss";
import { Navbar, Nav, Image, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { OrderContext } from "../../ContextProvider/OrderContextProvider";
import { BillContext } from "../../ContextProvider/BillContextProvider";
import { CurrentUserContext } from "../../ContextProvider/CurrentUserContextProvider";
import AddProductBtn from "./AddProductBtn";
import SettingDropdown from "./SettingDropdown";

import logoSvg from "../../assets/svgs/logo.svg";
import cartSvg from "../../assets/svgs/cart.svg";
import productSvg from "../../assets/svgs/products.svg";

import { removeAscent } from "../../helpers";

function NavBar() {
  const history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);
  let [input, setInput] = useState("");

  const { cart, getCartLoading } = useContext(OrderContext);

  const { billList } = useContext(BillContext);

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
            <Image className="navbar-logo" src={logoSvg} alt="logo" rounded />
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="/productList/1">
                <Image
                  className="navbar-logo"
                  src={productSvg}
                  alt="productSvg"
                />
              </Nav.Link>

              {currentUser && currentUser.role !== "client" && (
                <AddProductBtn />
              )}

              {currentUser && (
                <Nav.Link href="/orders">
                  <Image
                    src={cartSvg}
                    className="navbar-logo"
                    alt="cartSvg"
                  />

                  <Badge variant="danger">
                    {getCartLoading ? "loading" : cart.length}
                  </Badge>
                </Nav.Link>
              )}

              <SettingDropdown currentUser={currentUser} billList={billList} />
            </Nav>

            <form className="navbar-searchbox" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="mì tôm, Iphone, ..."
                name="keyword"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />

              <button onClick={handleSearch}>
                <span role="img" aria-label="">
                  🔍
                </span>
              </button>
            </form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
