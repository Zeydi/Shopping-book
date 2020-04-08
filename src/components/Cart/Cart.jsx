import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  loadOffers
} from "../../actions/cartActions";

import Recipe from "../Recipe/Recipe";
import "./cart.css";

class Cart extends Component {
  // find offers
  componentWillMount() {
    const items = this.props.items.map(item => item.isbn);
    this.props.loadOffers(...items);
  }

  //to remove the item completely
  handleRemove = isbn => {
    this.props.removeItem(isbn);
  };
  //to add the quantity
  handleAddQuantity = isbn => {
    this.props.addQuantity(isbn);
  };
  //to substruct from the quantity
  handleSubtractQuantity = isbn => {
    this.props.subtractQuantity(isbn);
  };

  //find the best offer
  getBestOffer = () => {
    let bestOffer = 0;
    if (this.props.offer && this.props.totalPrice > 0) {
      let percentage = this.props.offer.offers.find(
        elt => elt.type === "percentage"
      );
      let minus = this.props.offer.offers.find(elt => elt.type === "minus");
      let slice = this.props.offer.offers.find(elt => elt.type === "slice");
      let percentPromo = percentage
        ? (percentage.value * this.props.totalPrice) / 100
        : 0;
      let minusPromo = minus ? minus.value : 0;
      let slicePromo = slice
        ? Math.floor(this.props.totalPrice / slice.sliceValue) * slice.value
        : 0;
      bestOffer = Math.max(percentPromo, slicePromo, minusPromo);
    }
    return bestOffer;
  };

  render() {
    const { items, totalPrice } = this.props;
    let addedItems = items.length ? (
      items.map(item => {
        return (
          <div className="card added" key={item.isbn}>
            <li className="collection-item avatar">
              <div className="card-image">
                <img src={item.cover} alt={item.cover} />
              </div>

              <div className="item-desc">
                <span className="title">{item.title}</span>
                <p>
                  <b>Price: {item.price}$</b>
                </p>
                <p>
                  <b>Quantity: {item.quantity}</b>
                </p>
                <div className="add-remove">
                  <Link to="/cart">
                    <i
                      className="material-icons"
                      onClick={() => {
                        this.handleAddQuantity(item.isbn);
                      }}
                    >
                      arrow_drop_up
                    </i>
                  </Link>
                  <Link to="/cart">
                    <i
                      className="material-icons"
                      onClick={() => {
                        this.handleSubtractQuantity(item.isbn);
                      }}
                    >
                      arrow_drop_down
                    </i>
                  </Link>
                </div>
                <button
                  className="waves-effect waves-light btn pink remove"
                  onClick={() => {
                    this.handleRemove(item.isbn);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          </div>
        );
      })
    ) : (
      <p>No Books.</p>
    );
    return (
      <div className="box">
        <div className="cart ">
          <h5>You have ordered:</h5>
          <ul className="collection ">{addedItems}</ul>
        </div>
        <Recipe totalPrice={totalPrice} bestOffer={this.getBestOffer()} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { removeItem, addQuantity, subtractQuantity, loadOffers },
    dispatch
  );

const mapStateToProps = state => {
  return {
    items: state.addedItems,
    offer: state.offer,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
