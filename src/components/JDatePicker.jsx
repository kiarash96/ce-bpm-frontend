import { createSignal, createMemo, For } from "solid-js";
import { addYears, getDate, getMonth, getYear, lastDayOfMonth, nextFriday, previousSaturday, setDate, setMonth, setYear, isSaturday, isFriday, eachDayOfInterval, eachWeekOfInterval, addDays, subMonths, addMonths, isSameDay } from "date-fns-jalali";

import { toPersianDigits } from "../utils/persian";
import NumberInput from "./NumberInput";

import styles from "./JDatePicker.module.scss";


function JDatePicker(props) {
  const [viewDate, setViewDate] = createSignal(setDate(props.value || new Date(), 1));

  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"]

  const first = createMemo(() => setDate(viewDate(), 1));
  const last = createMemo(() => lastDayOfMonth(viewDate()));

  const firstSaturday = createMemo(() => isSaturday(first()) ? first() : previousSaturday(first()));
  const lastFriday = createMemo(() => isFriday(last()) ? last() : nextFriday(last()));

  return (
    <div class={styles.container} ref={props.ref} dir="rtl">
      <div class={styles.header}>
        <button class={styles.button} onClick={e => (e.preventDefault(), setViewDate(subMonths(viewDate(), 1)))}>{"<"}</button>
        <select id="month" name="month" value={getMonth(viewDate())} onInput={e => setViewDate(setMonth(viewDate(), e.target.value))}>
          {months.map((x, i) => <option value={i}>{x}</option>)}
        </select>
        <NumberInput
          id="year"
          name="year"
          size="4"
          value={toPersianDigits(getYear(viewDate()))}
          onInput={e => {
            const x = Number(e.target.value);
            if (x > 0)
              setViewDate(setYear(viewDate(), x));
          }}
          onIncrement={() => setViewDate(addYears(viewDate(), 1))}
          onDecrement={() => getYear(viewDate()) > 1 && setViewDate(addYears(viewDate(), -1))}
        />
        <button class={styles.button} onClick={e => (e.preventDefault(), setViewDate(addMonths(viewDate(), 1)))}>{">"}</button>
      </div>
      <table class={styles.calendar}>
        <thead>
          <tr>
            <For each={daysOfWeek}>
              {x => <th>{x}</th>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={eachWeekOfInterval({ start: firstSaturday(), end: lastFriday() }, { weekStartsOn: 6 })}>{week =>
            <tr>
              <For each={eachDayOfInterval({ start: week, end: addDays(week, 6) })}>{x =>
                <td classList={{
                  [styles.today]: isSameDay(x, new Date()),
                  [styles.holiday]: isFriday(x),
                  [styles.disabled]: getMonth(x) !== getMonth(viewDate()),
                  [styles.active]: isSameDay(x, props.value)
                }}
                  onClick={() => getMonth(x) == getMonth(viewDate()) && props.onSelect && props.onSelect(x)}>
                  {toPersianDigits(getDate(x))}
                </td>
              }</For>
            </tr>
          }</For>
        </tbody>
      </table>
      <div class={styles.footer}>
        <button onClick={e => (e.preventDefault(), setViewDate(setDate(new Date(), 1)) && props.onSelect && props.onSelect(new Date()))}>امروز</button>
      </div>
    </div>
  );
}

export default JDatePicker;
