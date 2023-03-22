import { useEffect, useState } from "react";
import EventList from "./EventList";
import FilteredEventList from "./FilteredEventList";

import "../../css/Monitoring/Monitoring.css";

function Monitoring() {
  return (
    <div className="Container-Events">
      <EventList />
      <FilteredEventList />
    </div>
  );
}

export default Monitoring; 
