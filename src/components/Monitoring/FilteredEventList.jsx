import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, orderBy} from "firebase/firestore";

import "../../css/Monitoring/FilteredEventList.css";

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

function FilteredEventList()  {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");

  async function getFilteredEvents(accountNumber) {
    const docs = query(
      collection(db, "events"),
      where("accountNumber", "==", accountNumber), 
      where("attendedEvent", "==", true),
      orderBy("dateEvent", "desc"),
      orderBy("eventTime", "asc")
    );
    await getDocs(docs)
      .then((response) => {
        const data = response.docs.map((event) => ({
          data: event.data(),
          id: event.id,
        }));
        setFilteredEvents(data);
      }).catch((error) => {
        console.log("Erro: " + error);
      });
  }

  return (
    <div className="Container-Filtered-Events">
      <div className="Search-Events">
        <input 
          type="text" 
          maxLength={4}
          placeholder="Número da conta:"  
          value={accountNumber} onChange={(event) => { setAccountNumber(event.target.value) }}
        />
        <button onClick={() => getFilteredEvents(accountNumber)}>Pesquisar</button>
      </div>

      <ul className="Filtered-Event-List">
        {filteredEvents.map((event) => (
          <li key={event.id} className="Filtered-Event">
            <h3>Cliente: {event.data.accountNumber} - {event.data.eventDescription}</h3>
            <p>Cod.: {event.data.eventCode}</p>
            <p>Zona: {event.data.zoneNumber}</p>
            <p>Partição: {event.data.partitionNumber}</p>
            <p>Data: {event.data.dateEvent}</p>
            <p>Horário: {event.data.eventTime}</p>
            <p>Status: {event.data.attendedEvent ? 'Fechado' : 'Aberto'}</p>
            <hr />
            <h4>Log do Evento: {event.data.eventLog}</h4>
          </li>          
        ))}
      </ul>
    </div>
  );
}

export default FilteredEventList;

// TODO: Adicionar aba lateral com os dados do cliente (Aba de contatos)
