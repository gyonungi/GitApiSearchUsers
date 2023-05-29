import { useEffect, useState } from "react";
import s from "./Main.module.css";
import Card from "../../components/Card/Card";
const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const getUsers = async (value, number) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${value}&sort=repositories&order=${value}&page=${number}`,
      { headers: { "Content-Type": "application/json" }, method: "GET" }
    );
    console.log(value);
    const users = await response.json();
    setUsers(users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  //INPUT
  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    setInputValue(inputValue);
    getUsers(inputValue);
  };
  console.log(users?.items);
  //SORT
  const [select,setSelect] = useState("")
 const handleSelect = (e) =>{
  let select = e.target.value;
  setSelect(select)
  getUsers(select)

}
  /* function numDescending() {
    users?.items?.sort((a, b) => a?.repos_url?.length - b?.repos_url?.length);
    return setSortUser(sortUser + users);
  }
  const [sortUsers, setSortUsers] = useState(null);
  function numAscending() {
    users?.items?.sort((a, b) => b?.repos_url?.length - a?.repos_url?.length);
    return setSortUsers(sortUsers + users);
  } */
  //PAGINATINO
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 30;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const displayusers = users?.items?.slice(indexOfFirstTodo, indexOfLastTodo);

  const [clickPage, setClickPage] = useState(Number);
  const clickPagin = (e) => {
    let clickPage = e.target.id;
    setCurrentPage(clickPage);
    setClickPage(clickPage);
    getUsers(clickPage);
  };
  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users?.total_count / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers?.map((number) => {
    return (
      <li key={number} id={number} onClick={(e) => clickPagin(e)}>
        {number}
      </li>
    );
  });
  return (
    <>
      <h2 className={s.mainH2}>GitHub Search 🔍</h2>
      <div className={s.mainSearch}>
        <form className={s.searchForm} action="#">
          <input
            data-testid="value-elem"
            className={s.searchText}
            placeholder="Поиск пользователя"
            name="search"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <ul className={s.pagenumbers}>{renderPageNumbers}</ul>
      <div className={s.DivSort}>
        <p>Сортировка:</p>
        <div>
          <select name="select" id="select" value={select} onChange={handleSelect}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
{/*           <button
            data-testid="Asc-btn"
            className={s.Asc}
        onClick={ascSort} 
          >
            Вниз
          </button>
          <button
            data-testid="Desc-btn"
            className={s.Desc}
            onClick={numDescending} 
          >
            Вверх
          </button> */}
        </div>
      </div>
      <div className={s.DivCards}>
        {users?.items?.length ? (
          users?.items?.map((item) => <Card key={item.id} date={item} />)
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </>
  );
};
export default Main;
