import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
