import React from "react";
import "./styles.scss";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"

export default function Appointment (props) {
  const {interview } = props;

  return (
    <article className="appointment">
     {/* {props.time} */}
      <Header time={props.time} />
      {props.interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
  )
}