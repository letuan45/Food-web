import Table from "react-bootstrap/Table";

const CartTable = (props) => {
  const { cartItems } = props;

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.amount;
  }, 0);
  const totalPriceDisplay = Number(totalPrice).toLocaleString("en");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.amount,
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
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.amount}</td>
            <td>
              {Number(item.price * item.amount).toLocaleString("en")} VND
            </td>
          </tr>
        ))}
        <tr style={{ fontWeight: "600", color: "var(--primary)" }}>
          <td style={{ color: "var(--green)" }}>#</td>
          <td style={{ color: "var(--green)" }}>Tổng</td>
          <td style={{ color: "var(--green)" }}>{totalAmount}</td>
          <td style={{ color: "var(--green)" }}>{totalPriceDisplay} VND</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CartTable;
