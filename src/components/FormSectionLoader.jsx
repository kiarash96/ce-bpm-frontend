import { createMemo } from "solid-js";
import { Show, For } from "solid-js/web";

import Alert from "./Alert";
import FormSubmitSection from "./FormSubmitSection";

function FormSectionLoader(props) {
  const index = createMemo(() => props.mappings?.indexOf(props.key));

  return (
    <Show when={index() > -1}
      fallback={<Alert message="قسمت مورد نظر در فرم وجود ندارد." type="error" />}
    >
      <For each={props.sections?.slice(0, index() + 1)}>
        {x => x}
      </For>
      <FormSubmitSection />
    </Show>
  );
}

export default FormSectionLoader;
