import { splitProps } from "solid-js";
import styles from "./FormContainer.module.scss";

function FormContainer(props) {
  const [local, others] = splitProps(props, ["title"]);

  return (
    <form
      dir="rtl"
      {...others}
    >
      {props.title && <h1 class={styles.title}>{props.title}</h1>}
      <div class={styles.body}>
        {props.children}
      </div>
    </form>
  );
}

export default FormContainer;
