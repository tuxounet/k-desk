import moment from "moment";

interface DateTextProp {
  date?: Date;
}

export default function DateText(props: DateTextProp) {
  if (!props.date) return <></>;
  return (
    <span title={moment(props.date).calendar()}>
      {moment(props.date).fromNow()}
    </span>
  );
}
