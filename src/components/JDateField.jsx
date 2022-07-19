import { parse, format } from "date-fns-jalali";

import Field from "./Field";
import JDateInput from "./JDateInput";


const JDateField = (props) => (
  <Field
    render={(x, setX) => (
      <JDateInput
        value={x && parse(x, "yyyy/MM/dd", new Date())}
        onInput={date => setX(format(date, "yyyy/MM/dd"))}
      />
    )}
    {...props}
  />
);

export default JDateField;
