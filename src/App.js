import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import AdminPage from "./Components/AdminPage";
import EditModal from "./Components/EditModal";
import ProtectedRoute from "./Components/ProtectedRoute";
import Signin from "./Components/Signin";
import VeterinerPage from "./Components/VeterinerPage";


axios.defaults.baseURL = "http://localhost:5000/";
function App() {
  return (
    <BrowserRouter>
      
      <EditModal />
      <Switch>
        <Route exact path="/signin">
          <Signin/>
        </Route>
        <ProtectedRoute exact path="/Admin" component={AdminPage} roles={["Admin"]}/>
        <ProtectedRoute exact path="/Veteriner" component={VeterinerPage} roles={["Veteriner","Admin"]} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
