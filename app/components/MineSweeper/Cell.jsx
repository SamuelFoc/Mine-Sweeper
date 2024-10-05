import Mine from "./Mine";
import Neighbors from "./Neighbors";
import styles from "./styles/Cell.module.css";

export default function Cell({ data, reveal, flag }) {
  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        flag();
      }}
      onClick={() => reveal()}
      className={
        data?.revealed
          ? styles.cell
          : data?.flagged
          ? styles.cell_back_flag
          : styles.cell_back
      }
    >
      {data?.mine ? <Mine /> : <Neighbors number={data?.neighbors} />}
    </div>
  );
}
