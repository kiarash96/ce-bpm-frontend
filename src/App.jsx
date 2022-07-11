import { createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Router, Routes, Route, useParams, useSearchParams } from "solid-app-router";

import "modern-css-reset";
import "./App.scss";

import TaskForm from "./components/TaskForm";
import Alert from "./components/Alert";

import MscSupervisorSelectionForm from "./forms/MscSupervisorSelectionForm";

const FormLoader = () => {
  const { formId, sectionId } = useParams();
  const [{ taskId, callbackUrl }] = useSearchParams();

  const form = createMemo(() => ({
    "msc-supervisor-selection" : MscSupervisorSelectionForm,
    // TODO: Insert forms here
  }[formId]));

  return (
    <Show
      when={form()}
      fallback={<Alert message="فرم مورد نظر وجود ندارد." type="error" />}
    >
      <TaskForm
        taskId={taskId}
        onComplete={() => window.location.replace(callbackUrl)}
      >
        <Dynamic component={form()} section={sectionId} />
      </TaskForm>
    </Show>
  );
}

const App = () => (
  <Router>
    <main>
      <Routes>
        <Route path={import.meta.env.BASE_URL + "/:formId/:sectionId"} element={<FormLoader />} />
        <Route path="/*" element={<FormLoader />} />
      </Routes>
    </main>
  </Router>
);

export default App;
