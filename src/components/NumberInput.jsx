import { splitProps } from "solid-js";
import styles from "./NumberInput.module.scss";

function NumberInput(props) {
  const [local, others] = splitProps(props, ["onIncrement", "onDecrement"]);

  return (
    <fieldset class={styles.container}>
      <button class={styles.button} onClick={e => (e.preventDefault(), local.onDecrement())}>-</button>
      <input class={styles.input} type="number" {...others} />
      <button class={styles.button} onClick={e => (e.preventDefault(), local.onIncrement())}>+</button>
    </fieldset>
  );
}

export default NumberInput;
