import { splitProps } from "solid-js";
import { Switch, Match, Show, Dynamic } from "solid-js/web";

import { useForm } from "./TaskForm";
import { toggle } from "../utils/array";

function Field(props) {
  const [local, others] = splitProps(props, ["as", "render"]);
  const [values, setValues] = useForm();

  const CustomField = () => props.render(values[props.name], (x) => setValues(props.name, x));

  const DefaultField = () => (
    <Dynamic component={props.as || "input"}
      value={values[props.name]}
      onInput={e => setValues(props.name, e.target.value)}
      {...others}
    />
  );

  const RadioField = () => (
    <input
      checked={values[props.name] == props.value}
      onInput={e => setValues(props.name, e.target.value)}
      {...others}
    />
  );

  const BinaryCheckboxField = () => (
    <input
      checked={values[props.name]}
      onInput={e => setValues(props.name, !values[props.name])}
      {...others}
    />
  );

  const MultiCheckboxField = () => (
    <input
      checked={values[props.name]?.includes(props.value)}
      onInput={e => setValues(props.name, toggle(values[props.name] || [], e.target.value))}
      {...others}
    />
  );

  return (
    <Show when={!props.render}
      fallback={CustomField}
    >
      <Switch fallback={<DefaultField />}>
        <Match when={props.type === "radio"}><RadioField /></Match>
        <Match when={props.type === "checkbox"}>
          {props.value ? <MultiCheckboxField /> : <BinaryCheckboxField />}
        </Match>
      </Switch>
    </Show>
  );
}

export default Field;
