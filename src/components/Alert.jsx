import { splitProps } from "solid-js";
import styles from "./Alert.module.scss";

function Alert(props) {
  const [local, others] = splitProps(props, ["message", "type"]);

  return (
    <div
      class={styles.common}
      classList={{ [styles[props.type]]: true }}
      {...others}
    >
      {props.message}
    </div>
  );
}

export default Alert;
