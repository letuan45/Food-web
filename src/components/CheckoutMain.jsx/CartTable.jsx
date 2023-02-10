import Table from "react-bootstrap/Table";

const CartTable = (props) => {
  const { cartItems } = props;   

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
          <tr key={item.id}>
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
          <td style={{ color: "var(--green)" }}>20</td>
          <td style={{ color: "var(--green)" }}>1,000,000 VND</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CartTable;
