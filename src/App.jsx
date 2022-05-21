import { createMemo } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Router, Routes, Route, useParams, useSearchParams } from "solid-app-router";

import "modern-css-reset";
import "./App.scss";

import TaskForm from "./components/TaskForm";
import Alert from "./components/Alert";

const FormLoader = () => {
  const { formId } = useParams();
  const [{ taskId, callbackUrl }] = useSearchParams();

  const form = createMemo(() => ({
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
        <Dynamic component={form()} />
      </TaskForm>
    </Show>
  );
}

const App = () => (
  <Router>
    <main>
      <Routes>
        <Route path="/*formId" element={<FormLoader />} />
      </Routes>
    </main>
  </Router>
);

export default App;
