import React, { useEffect, useState } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({...state, day});
  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log(id, interview);

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => 
        setState({ ...state, appointments })
      )
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id], 
      interview: null 
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
      .then(() =>
        setState({...state, appointments})
      )
    
  }
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interviewers={interviewers}
      interview={interview}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  );
});

  useEffect (() => {

    Promise.all([
      Promise.resolve( axios.get("/api/days")),
      Promise.resolve( axios.get("/api/appointments")),
      Promise.resolve( axios.get("/api/interviewers"))
    ])
      .then((all) => {
        setState(prev => ({ 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }));
    });

  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}