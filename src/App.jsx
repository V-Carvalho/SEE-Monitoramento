import Header from "./components/Header/Header";
import Monitoring from "./components/Monitoring/Monitoring";
import "./css/App.css";

//TODO: Buscar os eventos do firebase aqui e passar para os componentes

function App() {
  return (
    <div className="App">
      <Header />
      <Monitoring />
    </div>
  );
}

export default App;
