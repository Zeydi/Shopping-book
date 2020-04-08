import React from "react";
import { shallow } from "enzyme";
import Book from "./Book";

describe("Book component", () => {
  const mockHandleClick = jest.fn();

  const book = shallow(<Book handleClick={mockHandleClick} />);

  it("renders correctly", () => {
    expect(book).toMatchSnapshot();
  });

  it("button click should call function passed as props", () => {
    book.find(".btn-floating").simulate("click");
    expect(mockHandleClick).toHaveBeenCalled();
  });

  it("should toggle isopen when clicking", () => {
    expect(book.state().isOpen).toBe(false);

    const toggle = book.find("#toggle");
    toggle.simulate("click");
    expect(book.state().isOpen).toBe(true);

    toggle.simulate("click");
    expect(book.state("isOpen")).toEqual(false);
  });
});
