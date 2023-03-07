import classes from "./UserProfile.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserProfile = (props) => {
  const { user } = props;
  return (
    <div className={classes.item}>
      <div className={classes.avatar}>
        <AccountCircleIcon />
      </div>
      <ul className={classes["info_list"]}>
        <li className={classes["info-item"]}>
          Họ và tên: <span>{user.name}</span>
        </li>
        <li className={classes["info-item"]}>
          Địa chỉ: <span>{user.address}</span>
        </li>
        <li className={classes["info-item"]}>
          SĐT: <span>{user.phone}</span>
        </li>
        <li className={classes["info-item"]}>
          Email: <span>{user.email}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
