import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar total={this.props.total} />
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    total: state.totalItems,
  };
};
export default connect(mapStateToProps)(App);
