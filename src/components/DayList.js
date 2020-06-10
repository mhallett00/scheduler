import React from 'react'
import DayListItem from './DayListItem'
// import classNames from  "classnames";

export default function DayList(props) {
  const { days } = props
  const parsedDays = days ? days.map(day => {

    return <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={event => props.setDay(day.name)}
    />
  }) : "No data!"
  
  return (

    <ul>
      {parsedDays}
    </ul> 

  ) 


}