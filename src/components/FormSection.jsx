import { splitProps } from "solid-js";

import styles from "./FormSection.module.scss";

function FormSection(props) {
  const [local, others] = splitProps(props, ["title", "grid"]);

  return (
    <section class={styles.section} {...others}>
      {props.title && <h2 class={styles.title}>{props.title}</h2>}
      <div classList={{ [styles.grid]: props.grid }}>
        {props.children}
      </div>
    </section>
  );
}

export default FormSection;
