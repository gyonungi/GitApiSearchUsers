import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Main from "../pages/MainPage/Main";
import Card from "../components/Card/Card";

describe("TestApp", () => {
  test("input", () => {
    render(<Main />);
     const input = screen.getByPlaceholderText(/Поиск пользователя/i);
     expect(screen.queryByTestId("value-elem")).toContainHTML("");
     fireEvent.input(input,{
      target:{value:"123"}
     })
  });
});

test("click Event", () => {
  render(<Main />);
  const button = screen.getByText('Вниз');
  expect(button).toBeInTheDocument();
  const Ascbtn = screen.getByTestId("Asc-btn");
  const Descbtn = screen.getByTestId("Desc-btn");
  fireEvent.click(Ascbtn);
  fireEvent.click(Descbtn);
});


  test("renders listData Card", () => {
    render(<Card />);
    const list = screen.getAllByTestId("list-item");
    expect(list.length).toEqual(1);
  });

  test("use effect hooks" ,()=>{
    render(<Main/>)
    expect(screen.queryByText(/Не найден пользователь/i)).not.toBeInTheDocument()
  })