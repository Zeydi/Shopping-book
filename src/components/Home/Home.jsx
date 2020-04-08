import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { addToCart, loadBooks } from "../../actions/cartActions";
import Book from "../Book/Book";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      searchedItems: [],
    };
  }

  // load all books
  componentWillMount() {
    this.props.loadBooks();
  }

  handleClick = (id) => {
    this.props.addToCart(id);
  };

  handleChange = (evt) => {
    this.setState({ searchValue: evt.target.value });
    this.findItems(evt.target.value);
  };

  // to show items matched with searchValue
  findItems = (value) => {
    let items = [];
    items = this.props.items.filter((elt) =>
      elt.title.toLowerCase().includes(value)
    );
    this.setState({ searchedItems: items });
  };

  render() {
    const { searchValue, searchedItems } = this.state;
    return (
      <div className="container">
        <h3 className="center">Our items</h3>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">search</i>
                  <input
                    type="text"
                    id="autocomplete-input"
                    className="autocomplete"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          {searchValue !== ""
            ? searchedItems.map((item) => (
                <Book
                  key={item.isbn}
                  title={item.title}
                  price={item.price}
                  cover={item.cover}
                  id={item.isbn}
                  info={item.synopsis}
                  handleClick={this.handleClick}
                />
              ))
            : this.props.items.map((item) => (
                <Book
                  key={item.isbn}
                  title={item.title}
                  price={item.price}
                  cover={item.cover}
                  id={item.isbn}
                  info={item.synopsis}
                  handleClick={this.handleClick}
                />
              ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addToCart, loadBooks }, dispatch);

const mapStateToProps = (state) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
