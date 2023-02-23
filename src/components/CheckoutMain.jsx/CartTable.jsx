import Table from "react-bootstrap/Table";

const CartTable = (props) => {
  const { cartItems } = props;

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  const totalPriceDisplay = Number(totalPrice).toLocaleString("en");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Table
      striped
      style={{ border: "2px dashed var(--grey)", fontSize: "1.1rem" }}
    >
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Món</th>
          <th>Số lượng</th>
          <th>Giá</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={item["id_item"]}>
            <td>{index}</td>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>
              {Number(item.price * item.quantity).toLocaleString("en")} VND
            </td>
          </tr>
        ))}
        <tr style={{ fontWeight: "600", color: "var(--primary)" }}>
          <td style={{ color: "var(--green)" }}>#</td>
          <td style={{ color: "var(--green)" }}>Tổng giá</td>
          <td style={{ color: "var(--green)" }}>{totalAmount}</td>
          <td style={{ color: "var(--green)" }}>{totalPriceDisplay} VND</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CartTable;
