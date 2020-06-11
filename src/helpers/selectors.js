import React from "react";

export function getAppointmentsForDay(state, day) {
  const findNames = state.days && state.days.find(dayObj => dayObj.name === day); 

  if (!findNames) return [];
  
  const apptArr = findNames.appointments.map(appointmentId => {
    return state.appointments[appointmentId];

  })
  return apptArr
}