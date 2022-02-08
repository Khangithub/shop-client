import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import "./_navbar.scss";
import { Navbar, Nav, Image, Badge, Spinner } from "react-bootstrap";
import { OrderContext } from "../../ContextProvider/OrderContextProvider";
import { BillContext } from "../../ContextProvider/BillContextProvider";
import { CurrentUserContext } from "../../ContextProvider/CurrentUserContextProvider";
import AddProductBtn from "./AddProductBtn";
import SettingDropdown from "./SettingDropdown";

import logoSvg from "../../assets/svgs/logo.svg";
import cartSvg from "../../assets/svgs/cart.svg";
// import productSvg from "../../assets/svgs/products.svg";
import searchSvg from "../../assets/svgs/search.svg";

import { removeAscent } from "../../helpers";
import { getCurrentUserRequest } from "../../actions/user";

function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { currentUser } = useContext(CurrentUserContext);

  let [input, setInput] = useState("");

  const { cart, getCartLoading } = useContext(OrderContext);

  const { billList } = useContext(BillContext);
  const { currentUser, loading, err } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);


  if (_.isEmpty(currentUser))
    return <Spinner animation="grow" variant="danger" />;

  if (loading) return <Spinner animation="grow" variant="danger" />;

  if (!_.isEmpty(err, true))
    return <Spinner animation="grow" variant="danger" />;

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
              {/* <Nav.Link href="/productList/1">
                <Image
                  className="navbar-logo"
                  src={productSvg}
                  alt="productSvg"
                />
              </Nav.Link> */}

              {currentUser && currentUser.role !== "client" && (
                <AddProductBtn />
              )}
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

            <SettingDropdown currentUser={currentUser} billList={billList} />

            {currentUser && (
              <Nav.Link href="/orders">
                <Image src={cartSvg} className="navbar-logo" alt="cartSvg" />

                <Badge variant="danger">
                  {getCartLoading ? "loading" : cart.length}
                </Badge>
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
