import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store"; // Smart components
import Home from "./Home";

const mockStore = configureStore([]);

const initialState = {
  items: [],
};

describe("Home Component", () => {
  let store;
  let component;
  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
  it("should render with given state from Redux store", () => {
    expect(component).toMatchSnapshot();
  });
});
