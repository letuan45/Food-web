import { useState } from "react";

import classes from "./MainNavigation.module.css";

import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

import Logo from "../UI/Elements/Logo";
import scooterIcon from "../../assets/icons/scooter.png";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import MenuButton from "./MenuButton";
import Backdrop from "../UI/Modal/Backdrop";
import Authentication from "../UI/Modal/Auth/Authentication";
import SideCart from "../UI/Modal/SideCart";
import MobileMenu from "./MobileMenu";

const MainNavigation = () => {
  const [authenticationIsOpen, setAuthenticationIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  // modal actions
  //Auth
  const openAuthHandler = () => {
    if (mobileMenuIsOpen) setMobileMenuIsOpen(false);
    setAuthenticationIsOpen(true);
  };

  const closeAuthHandler = () => {
    setAuthenticationIsOpen(false);
  };

  //Cart
  const openCartHandler = () => {
    setCartIsOpen(true);
  };

  const closeCartHandler = () => {
    setCartIsOpen(false);
  };

  //Mobile menu
  const openMobileMenuHandler = () => {
    setMobileMenuIsOpen(true);
  };

  const closeMobileMenuHandler = () => {
    setMobileMenuIsOpen(false);
  };

  const closeBackdrop = () => {
    if (authenticationIsOpen) setAuthenticationIsOpen(false);
    else if (cartIsOpen) setCartIsOpen(false);
    else if (mobileMenuIsOpen) setMobileMenuIsOpen(false);
  };

  return (
    <div className={classes.menu}>
      {/* Render modal */}
      {authenticationIsOpen || cartIsOpen ? (
        <Backdrop onClose={closeBackdrop} />
      ) : null}
      <Authentication
        className={authenticationIsOpen ? "open" : ""}
        onClose={closeAuthHandler}
      />
      <SideCart
        className={cartIsOpen ? "open" : ""}
        onClose={closeCartHandler}
      />

      <Container className={classes["main-menu"]}>
        <div className={classes["menu-wrapper"]}>
          <NavLink to="/" className={classes.linker}>
            <Logo />
          </NavLink>
          <nav className={classes["navigator"]}>
            <ul className="d-flex align-items-center h-100">
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/shop"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Thực đơn
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/check-out"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Thanh toán
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/book-table"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Đặt bàn
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/contact"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Liên lạc
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes["fn-wrapper"]}>
            <div className={classes["ship-icon"]}>
              <img src={scooterIcon} alt="shipping-icon" />
            </div>
            <div className={classes["ship-desc"]}>
              <h4>
                <span className={classes.header}>Đặt hàng ngay tại: </span>
              </h4>
              <h3>
                <span className={classes.phone}>+ 1 123 456 789</span>
              </h3>
            </div>
            <div className={`d-flex align-items-center ${classes["mn-btn"]}`}>
              <MenuButton icon={<SearchTwoToneIcon />} />
              <MenuButton icon={<PersonIcon />} onClick={openAuthHandler} />
              <NavLink
                to="/wish-list"
                className={(props) =>
                  props.isActive ? classes["btn-active"] : ""
                }
              >
                <MenuButton icon={<FavoriteIcon />} quantity={10} />
              </NavLink>
              <MenuButton
                icon={<ShoppingBasketIcon />}
                quantity={5}
                onClick={openCartHandler}
              />
            </div>
          </div>
          {/* Mobile Menu */}
          <button
            className={classes["open-m-menu-btn"]}
            onClick={openMobileMenuHandler}
          >
            <div className={classes.line}></div>
            <div className={classes.line}></div>
            <div className={classes.line}></div>
          </button>
          <MobileMenu
            onClose={closeMobileMenuHandler}
            isOpen={mobileMenuIsOpen}
            openAuth={openAuthHandler}
          />
        </div>
      </Container>
    </div>
  );
};

export default MainNavigation;
