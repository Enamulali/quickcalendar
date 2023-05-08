import React, { useState, useEffect } from "react";
import { getAllEvents } from "../utils/api";

const ListEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ListEvents;
