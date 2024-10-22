import { Header } from "./components/Header/Header";
import { Body } from "./components/Body/Body";
import "./assets/styles/app.scss";

//define app with components
const App = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

export default App;
