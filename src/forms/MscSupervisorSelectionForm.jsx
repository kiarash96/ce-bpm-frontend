import { createResource, Show } from "solid-js";
import axios from "axios";

import FormContainer from "../components/FormContainer";
import FormSection from "../components/FormSection";
import Field from "../components/Field";
import JDateField from "../components/JDateField";
import FormSectionLoader from "../components/FormSectionLoader";
import { endpoint } from "../utils/api";

function SelectSupervisorSection() {
  const [users] = createResource(async () => (await axios.get(endpoint + '/user?memberOfGroup=msc-supervisors')).data);

  return (
    <FormSection grid>
      <label for="student.firstName">نام:</label><Field type="text" id="student.firstName" name="student.firstName" />
      <label for="student.lastName">نام خانوادگی:</label><Field type="text" id="student.lastName" name="student.lastName" />

      <label for="student.branch">گرایش:</label>
      <Field as="select" id="student.branch" name="student.branch">
        <option value="sw">نرم‌افزار</option>
        <option value="hw">سخت‌افزار</option>
        <option value="ai">هوش مصنوعی</option>
        <option value="it">فناوری اطلاعات</option>
      </Field>

      <label for="student.id">شماره دانشجویی:</label><Field type="text" id="student.id" name="student.id" />

      <label for="newSupervisor">استاد راهنمای انتخاب شده:</label>
      <Show when={!users.loading} fallback={<span>در حال دریافت اطلاعات...</span>}>
        <Field as="select" id="newSupervisor" name="newSupervisor">
          <For each={users()}>
            {x => <option value={x.id}>{x.firstName + " " + x.lastName}</option>}
          </For>
        </Field>
      </Show>
    </FormSection>
  );
}

const SupervisorReviewSection = () => (
  <FormSection title="تایید استاد راهنمای فعلی" grid>
    <label for="supervisorApproval">این‌جانب موافقت خود را با موارد بالا اعلام می‌دارم.</label>
    <Field style={{ "justify-self": "start" }} type="checkbox" id="supervisorApproval" name="supervisorApproval" />
    <label for="supervisorComment">توضیحات:</label>
    <Field type="text" id="supervisorComment" name="supervisorComment" />
  </FormSection>
);

const NewSupervisorReviewSection = () => (
  <FormSection title="تایید استاد راهنمای جدید" grid>
    <label for="newSupervisorApproval">این‌جانب موافقت خود را با موارد بالا اعلام می‌دارم.</label>
    <Field style={{ "justify-self": "start" }} type="checkbox" id="newSupervisorApproval" name="newSupervisorApproval" />
    <label for="newSupervisorComment">توضیحات:</label>
    <Field type="text" id="newSupervisorComment" name="newSupervisorComment" />
  </FormSection>
);

const GroupHeadReviewSection = () => (

  <FormSection title="تایید مدیر گروه" grid>
    <label for="groupHeadApproval">در جلسه‌ی گروه مطرح و موافقت شد.</label>
    <Field style={{ "justify-self": "start" }} type="checkbox" id="groupHeadApproval" name="groupHeadApproval" />
    <label for="groupSessionDate">تاریخ جلسه‌ی گروه:</label>
    <JDateField id="groupSessionDate" name="groupSessionDate" />
    <label for="groupHeadComment">توضیحات:</label>
    <Field type="text" id="groupHeadComment" name="groupHeadComment" />
  </FormSection>
);

const MscSupervisorSelectionForm = (props) => (
  <FormContainer title="فرم انتخاب استاد راهنمای دانشجویان ارشد">
    <FormSectionLoader
      sections={[SelectSupervisorSection, SupervisorReviewSection, NewSupervisorReviewSection, GroupHeadReviewSection, () => null]}
      mappings={["select-supervisor", "supervisor-review", "new-supervisor-review", "group-head-review", "feedback"]}
      key={props.section}
    />
  </FormContainer>
);

export default MscSupervisorSelectionForm;
