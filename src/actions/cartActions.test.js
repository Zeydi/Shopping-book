import * as constants from "./actionsTypes";
import * as actions from "./cartActions";

it("creates an action to add book to chart", () => {
  const isbn = "c8fabf68-8374-48fe-a7ea-a00ccd07afff";
  const expectedAction = { type: constants.ADD_TO_CART, payload: isbn };
  expect(actions.addToCart(isbn)).toEqual(expectedAction);
});
