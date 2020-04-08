import React from "react";
import { shallow } from "enzyme";
import Recipe from "./Recipe";

describe("Recipe Component", () => {
  const totalPrice = 10;
  const bestOffer = 5;

  const recipe = shallow(
    <Recipe totalPrice={totalPrice} bestOffer={bestOffer} />
  );

  it("renders correctly", () => {
    expect(recipe).toMatchSnapshot();
  });

  it("shows all received props", () => {
    expect(recipe.contains(<b>Total: {totalPrice} $</b>)).toBeTruthy();
    expect(recipe.contains(<b>Discount: {bestOffer} $</b>)).toBeTruthy();
    expect(
      recipe.contains(<b>To pay: {totalPrice - bestOffer} $</b>)
    ).toBeTruthy();
  });
});
