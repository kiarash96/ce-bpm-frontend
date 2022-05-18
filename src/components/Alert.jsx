import styles from "./Alert.module.scss";

const Alert = (props) => (
  <div
    class={styles.common}
    classList={{ [styles[props.type]]: true }}
  >
    {props.message}
  </div>
);

export default Alert;
