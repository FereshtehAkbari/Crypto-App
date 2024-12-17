import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

function TableCoin({ coins, isLoading, setChart }) {
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  coin: {
    image,
    symbol,
    name,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  },
  setChart,
}) => {
  const showHandler = () => {
    setChart(true);
  };
  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>
        {price_change.toFixed(2)}
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change > 0 ? chartUp : chartDown}
          alt={price_change > 0 ? "Up" : "Down"}
        />
      </td>
    </tr>
  );
};
