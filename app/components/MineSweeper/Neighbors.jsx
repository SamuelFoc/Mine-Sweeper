import styles from "./styles/Neighbors.module.css";

export default function Neighbors({ number }) {
  return <div className={styles.number}>{number > 0 ? number : ""}</div>;
}
