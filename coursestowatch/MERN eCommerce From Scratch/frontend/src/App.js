import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./components/ProductScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Header brand="App" />
        <main className="py-3">
          <Container>
            <Switch>
              <Route component={HomeScreen} exact={true} path="/" />
              <Route
                component={ProductScreen}
                exact={true}
                path="/product/:id"
              />
            </Switch>
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
