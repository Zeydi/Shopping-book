import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; // Smart components
import Cart from "./Cart";

const mockStore = configureStore([]);

const initialState = {
  items: [],
};

describe("Cart Component", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    component = shallow(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component).toMatchSnapshot();
  });
});
