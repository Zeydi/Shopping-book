import React, { Component } from "react";
import "./Book.css";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleReveal = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  renderResume = () => {
    const { title, info } = this.props;

    return (
      <div>
        <h6 className="grey-text text-darken-4">
          {title}
          <i
            className="material-icons   link"
            onClick={() => this.toggleReveal()}
          >
            close
          </i>
        </h6>
        <p className="info">{info}</p>
      </div>
    );
  };

  render() {
    const { isOpen } = this.state;
    const { title, cover, price, id } = this.props;
    return (
      <div className="card cover">
        {!isOpen ? (
          <div>
            <div className="card-image">
              <img src={cover} alt={title} />
            </div>
            <div className="card-content">
              <span className="card-title ">{title}</span>
              <p>
                <b>Price: {price}$</b>
              </p>
              <div className="card-action link">
                <span id="toggle" onClick={() => this.toggleReveal()}>
                  Show resume
                </span>
              </div>
              <span
                to="/"
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() => {
                  this.props.handleClick(id);
                }}
              >
                <i className="material-icons">add</i>
              </span>
            </div>
          </div>
        ) : (
          this.renderResume()
        )}
      </div>
    );
  }
}

export default Book;
