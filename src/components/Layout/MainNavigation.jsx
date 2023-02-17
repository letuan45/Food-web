import { useEffect, useState } from "react";
import classes from "./MainNavigation.module.css";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//logos
import Logo from "../UI/Elements/Logo";
import scooterIcon from "../../assets/icons/scooter.png";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

//components & hooks
import MenuButton from "./MenuButton";
import Backdrop from "../UI/Modal/Backdrop";
import Authentication from "../UI/Modal/Auth/Authentication";
import SideCart from "../UI/Modal/SideCart";
import MobileMenu from "./MobileMenu";
import Button from "../UI/Button";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import httpClient from "../../utils/axiosInstance";
import useAuth from "../../hooks/use-auth";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import { toastAction } from "../../store";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [authenticationIsOpen, setAuthenticationIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const {
    response: logoutResponse,
    isLoading: logoutIsLoading,
    error: logoutError,
    axiosFetch: logoutAction,
  } = useAxiosFunction();
  const logoutURL = "/account/logout";
  const { logoutHandler } = useAuth();

  // modal actions
  //Auth
  const openAuthHandler = () => {
    if (user) return;
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

  const handleLogout = (event) => {
    event.preventDefault();

    //Gọi API đăng xuất
    logoutAction({
      axiosInstance: httpClient,
      method: "GET",
      url: logoutURL,
    });

    //Cập nhật redux State
    logoutHandler();
  };

  useEffect(() => {
    if (logoutResponse) {
      dispatch(
        toastAction.showToast({
          message: logoutResponse.message,
          type: "success",
        })
      );
    }
    if (logoutError) {
      dispatch(
        toastAction.showToast({
          message: logoutError.message,
          type: "error",
        })
      );
    }
  }, [logoutResponse, logoutError, dispatch]);

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
                  to="/checkout"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Thanh toán
                </NavLink>
              </li>
              <li className={classes["menu-item"]}>
                <NavLink
                  to="/cart"
                  className={(props) => (props.isActive ? classes.active : "")}
                >
                  Giỏ hàng
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
              <div className={classes["auth-btn-group"]}>
                <MenuButton
                  icon={<PersonIcon />}
                  onClick={openAuthHandler}
                ></MenuButton>
                {user && (
                  <div className={classes["user-infor-wrapper"]}>
                    <ul className={classes["user-infor"]}>
                      <li className={classes["user-infor__item"]}>
                        Họ và tên: <span>{user.name}</span>
                      </li>
                      <li className={classes["user-infor__item"]}>
                        Email: <span>{user.email}</span>
                      </li>
                      <li className={classes["user-infor__item"]}>
                        SĐT: <span>{user.phone}</span>
                      </li>
                      <li className={classes["user-infor__item"]}>
                        Địa chỉ: <span>{user.address}</span>
                      </li>
                    </ul>
                    <Link
                      to="/logout"
                      className={`${classes["logout-wrapper"]} ${
                        logoutIsLoading ? classes.disable : ""
                      }}`}
                      onClick={handleLogout}
                    >
                      <Button>
                        {logoutIsLoading ? <LoadingSpinner /> : "Đăng xuất"}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
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
