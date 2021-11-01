import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import VeterinerPage from './Components/VeterinerPage';

axios.defaults.baseURL="http://localhost:5000/";
function App() {
  return (
    <div className="container">
      <VeterinerPage/>
    </div>
  );
}

export default App;
