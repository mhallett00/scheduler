import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

import "./InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers } = props;
  const parsedInterviewers = interviewers
    ? interviewers.map((interviewer) => {
        return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            onChange={(event) => props.onChange(interviewer.id)}
          />
        );
      })
    : "No interviewers!";

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};
