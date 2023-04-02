import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { MdClose, MdDelete } from "react-icons/md";
import { getFirestore, collection, onSnapshot, deleteDoc, doc, updateDoc, where } from "firebase/firestore";

import "../../css/Monitoring/EventList.css";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function EventList() {
  const [events, setEvents] = useState([]);
  const [eventLog, setEventLog] = useState("");
  const [indexEvent, setIndexEvent ] = useState(undefined);

  useEffect(() => {
    getRealTimeEvents();
  }, []);  

  async function getRealTimeEvents() {
    onSnapshot(collection(db, "events"), where("attendedEvent", "==", false), (doc) => {
      const data = doc.docs.map((event) => ({
        data: event.data(),
        id: event.id,
      }));
      setEvents(data);
    });
  }   

  async function closeEvent(eventId, eventLog) {
    await updateDoc(doc(db, "events", eventId), { 
      attendedEvent: true,
      eventLog: eventLog, 
    });
    setEventLog(undefined);
  }

    return(
    <ul className="Event-List">
      {events.map((event, index) => (
        <div key={index}>          
          {event.data.attendedEvent
            ? 
          null
            :          
          <li key={event.id} className="Event">
            <div className="Event-Details">
              <h3>Cliente: {event.data.accountNumber} - {event.data.eventDescription}</h3>
              <p>Cod.: {event.data.eventCode}</p>
              <p>Zona: {event.data.zoneNumber}</p>
              <p>Partição: {event.data.partitionNumber}</p>
              <p>Data: {event.data.dateEvent}</p>
              <p>Horário: {event.data.eventTime}</p>
            </div>           

            <div className="Log">
              <label>
                <textarea 
                  rows={5}
                  type="text"                   
                  placeholder="Log do evento: " 
                  value={indexEvent == index ? eventLog : undefined} onChange={(event) => {
                    setIndexEvent(index); 
                    setEventLog(event.target.value) 
                  }}                  
                />
              </label>
              <button className="Close-Event-Button" onClick={() => closeEvent(event.id, eventLog)}> Fechar Evento </button>
            </div>
          </li>
          }
        </div>
      ))}
    </ul>
  );
}

export default EventList;