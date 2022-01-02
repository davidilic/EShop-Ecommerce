import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Home from "./screens/Home/Home";

function App() {
  return (
    <div>
        <Header/>
        <Container>
            <Home/>
        </Container>
        <Footer/>
    </div>
  );
}

export default App;
