import React from "react";
import "./styles.scss";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";


export default function Appointment (props) {
  const {interview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAdd = () => transition(CREATE); 
  const onCancel = () => back();

  return (
    <article className="appointment">
     {/* {props.time} */}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      { mode === CREATE && (
        <Form
        interviewers={[]}
        onSave={props.onSave}
        onCancel={onCancel}
        />
      )}
    </article>
  )
}