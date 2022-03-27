import { createSignal, onMount, onCleanup } from "solid-js";
import { format } from "date-fns-jalali";

import { toPersianDigits } from "../utils/persian";
import JDatePicker from "./JDatePicker";


function JDateInput(props) {
  const [visible, setVisible] = createSignal(false);

  let node, input;

  onMount(() => {
    const onClick = e => !node?.contains(e.target) && !input.contains(e.target) && setVisible(false);
    document.addEventListener("click", onClick);

    onCleanup(() => document.removeEventListener("click", onClick));
  });

  return (
    <div dir="rtl">
      <input ref={input}
        readonly
        size="10"
        type="text"
        value={toPersianDigits(props.value ? format(props.value, "yyyy/MM/dd") : "")}
        onFocus={() => setVisible(true)}
      // onInput={() => props.onInput(props.value)}
      />
      {visible() && <JDatePicker ref={node} value={props.value} onSelect={props.onInput} />}
    </div>
  );
}

export default JDateInput;
