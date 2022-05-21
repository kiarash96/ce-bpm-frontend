import { onMount, splitProps, createSignal, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { Show } from "solid-js/web";
import axios from "axios";

import { endpoint } from "../utils/api";

import Alert from "./Alert";


const FormContext = createContext();

function useForm() {
  return useContext(FormContext);
}

function TaskForm(props) {
  const [local, others] = splitProps(props, ["taskId", "defaultValues", "children"]);

  const [loading, setLoading] = createSignal(true);
  const [alertVisible, setAlertVisible] = createSignal(false);
  const [alert, setAlert] = createSignal({message: "", type: null});

  const [values, setValues] = createStore(local.defaultValues || {});

  const submit = async (e) => {
    e.preventDefault();

    setAlert({message: "در حال ارسال اطلاعات...", type: "info"});
    setAlertVisible(true);

    const data = Object.entries(values).reduce(
      (obj, [key, value]) => ({ [key]: { value: value }, ...obj }),
      {}
    );

    try {
      await axios.post(endpoint + `/task/${local.taskId}/complete`, data);
      setAlert({message: "ارسال فرم با موفقیت انجام شد.", type: "success"});
      props.onComplete && props.onComplete();
    }
    catch (error) {
      setAlert({message: error.message, type: "error"});
    }
  }

  onMount(async () => {
    try {
      setAlert({message: "در حال دریافت اطلاعات...", type: "info"});

      const result = (await axios.get(endpoint + `/task/${local.taskId}/variables`)).data;
      Object.entries(result).forEach(([key, obj]) => setValues(key, obj.value));

      setLoading(false);
    }
    catch (error) {
      setAlert({message: error.message, type: "error"});
    }
  });

  return (
    <FormContext.Provider value={[values, setValues]}>
      <form
        dir="rtl"
        {...others}
      >
        <Show
          when={!loading()}
          fallback={<Alert {...alert()} />}
        >
          {local.children}
          <div>
            <Show when={alertVisible()}><Alert {...alert()} /></Show>
            <button type="submit" onClick={submit}>ارسال</button>
          </div>
        </Show>
      </form>
    </FormContext.Provider>
  );
}

export default TaskForm;
export { FormContext, useForm, TaskForm }
