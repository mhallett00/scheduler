import React, { useEffect, useState } from "react";
import DayList from "./DayList"
import Appointment from "./Appointment";
import axios from "axios";

import "components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Brian Lines",
      interviewer: {
        id: 2,
        name: "Gareth Nichols",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "John Jackson",
      interviewer: {
        id: 3,
        name: "Tery Canter",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "6pm",
    interview: {
      student: "Sarah Sequira",
      interviewer: {
        id: 4,
        name: "Danny Oberton",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: "last",
    time: "7pm",
  }
];

export default function Application(props) {
  const [ day , setDay ] = useState("Monday");
  const [ days , setDays ] = useState([]);

  // console.log(appointments)
  const parsedAppointments = appointments.map(appointment => {
  
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment}
      />
    )
  })

  useEffect (() => {

    axios
      .get("/api/days")
      .then(res => setDays(res.data))
      .catch(e => console.log(e))

  }, [])

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
          days={days}
          day={day}
          setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        
      </section>
      <section className="schedule">
        {parsedAppointments}
      </section>
    </main>
  );
}
