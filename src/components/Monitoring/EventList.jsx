import { MdClose, MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
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

  async function closeEvent(eventId) {
    await updateDoc(doc(db, "events", eventId), { attendedEvent: true } );
  }

  async function deleteEvent(eventId) {
    await deleteDoc(doc(db, "events", eventId));
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
              <h3>Cliente: {event.data.accountNumber} - Botão de Pânico</h3>
              <p>Cod.: {event.data.eventCode}</p>
              <p>Zona: {event.data.zoneNumber}</p>
              <p>Partição: {event.data.partitionNumber}</p>
              <p>Data: {event.data.dateEvent}</p>
              <p>Horário: {event.data.eventTime}</p>
            </div>
            <button onClick={() => closeEvent(event.id)}> <MdClose size={23} /> </button>
          </li>
          }
        </div>
      ))}
    </ul>
  );
}

export default EventList;
