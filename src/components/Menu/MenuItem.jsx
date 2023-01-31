import classes from "./MenuItem.module.css";

const SubItem = (props) => {
  const price = Number(props.item.price).toLocaleString("en");

  return (
    <li className="d-flex">
      <div className={classes.image}>
        <img src={props.item.image} alt="hình ảnh sản phẩm" />
      </div>
      <div className="w-100 d-flex flex-column" style={{marginLeft: "20px"}}>
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            borderBottom: "2px dotted var(--grey-dark)",
            paddingBottom: "8px",
          }}
        >
          <h5 className={classes.name}>{props.item.name}</h5>
          <span className={classes.price}>{price} VND</span>
        </div>
        <div className={classes.ingre}>{props.item.ingredients}</div>
      </div>
    </li>
  );
};

const MenuItem = (props) => {
  const { items: foods } = props;

  if (!foods || !foods.length === 0) return <p>Không có đồ ăn nào</p>;

  return (
    <div className={classes.item}>
      <h3 className={classes.header}>{props.type}:</h3>
      <ul className="d-flex flex-column" style={{ marginTop: "10px" }}>
        {foods.map((food, idx) => (
          <SubItem item={food} key={idx}/>
        ))}
      </ul>
    </div>
  );
};

export default MenuItem;
