export function getAppointmentsForDay(state, day) {  
  const findNames = state.days && state.days.find(dayObj => dayObj.name === day);

  if (!findNames) return [];
  
  const apptArr = findNames.appointments.map(appointmentId => {
    return state.appointments[appointmentId];

  })

  return apptArr
};

export function getInterview (state, interview) {
    

  if (interview) {
    const interviewerId = interview.interviewer;

    let output = {
        student: interview.student,
        interviewer: {
          id: interviewerId,
          name: state.interviewers[interviewerId].name,
          avatar: state.interviewers[interviewerId].avatar
      }
    }

    return output
  }

  return null
};

export function getInterviewersForDay(state, day) {  
  const findNames = state.days && state.days.find(dayObj => dayObj.name === day);

  if (!findNames) return [];
  
  const apptArr = findNames.interviewers.map(interviewerId => {
    return state.interviewers[interviewerId];

  })

  return apptArr
};