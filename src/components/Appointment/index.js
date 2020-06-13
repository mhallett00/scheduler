import React from "react";
import "./styles.scss";
import Header from "./Header"
import Empty from "./Empty"
import Show from "./Show"
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment (props) {
  const {interview } = props;
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMDEL = "CONFIRMDEL";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAdd = () => transition(CREATE); 
  const onCancel = () => back();
  const onDelete = () => transition(CONFIRMDEL);
  const onEdit = () => transition(EDIT);
  const onClose = () => transition(SHOW, true)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  
  }

  function confirmDel() {
    
    transition(DELETING, true);

    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true))
  }

  console.log(props);
  return (
    <article className="appointment">
     {/* {props.time} */}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      { mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
        />
      )}
      { mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRMDEL && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onConfirm={confirmDel}
          onCancel={onCancel}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
        message="Could not save appointment"
        onClose={onClose}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error 
        message="Could not delete appointment"
        onClose={onClose}
        />
      )}

    </article>
  )
}