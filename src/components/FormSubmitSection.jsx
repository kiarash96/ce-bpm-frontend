import FormSection from "./FormSection";
import Alert from "./Alert";
import { useForm } from "./TaskForm";

import styles from "./FormSubmitSection.module.scss";
import { createEffect, createSignal } from "solid-js";

function FormSubmitSection(props) {
  const [values, setValues, handleSubmit] = useForm();
  const [alert, setAlert] = createSignal({message: "", type: null});

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setAlert({message: "در حال ارسال اطلاعات...", type: "info"});
      await handleSubmit();
      setAlert({message: "ارسال اطلاعات با موفقیت انجام شد.", type: "success"});
    }
    catch (error) {
      setAlert({message: error.message, type: "error"});
    }
  }

  return (
    <FormSection {...props}>
      {alert().message && <Alert style={{"margin-bottom": "1rem"}} {...alert()} />}
      <button class={styles.button} type="submit" onClick={handleClick}>ارسال</button>
    </FormSection>
  );
}

export default FormSubmitSection;
