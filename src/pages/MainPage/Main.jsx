import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import s from "./Main.module.css";
import Card from "../../components/Card/Card";
import ReactPaginate from "react-paginate";
const Main = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSorted, setisSorted] = useState(false);
  const [users, setUsers] = useState([]);

  const handleClick = () => {
    setisSorted((current) => !current);
  };
  /*   const dispatch = useDispatch(); */
  const getUsers = async (value) => {
    const response = await fetch(
      `https://api.github.com/search/users?q=${value}`,
      {headers: {'Content-Type': 'application/json'}, method: "GET"}
  );
    const users = await response.json();
    setUsers(users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const objectToArray = (data) => {
    return Object.keys(data).map((key) => {
      return {
        id: key,
        ...data,
      };
    });
  };
  /*   function searchGit(e) {
    e.preventDefault();
    dispatch(getUsers(inputValue));
  } */
  //INPUT
  const handleInputChange = (event) => {
    let inputValue = event.target.value;
    setInputValue(inputValue);
    getUsers(inputValue);
  };
  let gitUser = objectToArray(users);
  console.log(gitUser?.[2]?.items);

  //SORT
  const [sortuser, setSortUser] = useState(null);
  function numAscending() {
    const SortUser = gitUser?.[2]?.items;
    SortUser?.sort((a, b) => a?.repos_url?.length - b?.repos_url?.length);
  return  setSortUser(gitUser);
  }
  const [sortusers, setSortUsers] = useState(null);
  function numDescending() {
    gitUser?.[2]?.items?.sort(
      (a, b) => b?.repos_url?.length - a?.repos_url?.length
    );
    return  setSortUsers(gitUser);
  }

  //PAGINATINO
  const [page, setPage] = useState(0);
  const usersPerPage = 5;
  const numberOfusersVistited = page * usersPerPage;
  const displayusers = gitUser?.[2]?.items
    ?.slice(numberOfusersVistited, numberOfusersVistited + usersPerPage)  
    .map((item) => {
      return <Card key={item.id} date={item} />;
    });
  const totalPages = Math.ceil(gitUser?.[2]?.items?.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPage(selected);
  };
  return (
    <>
      <h2 className={s.mainH2}>GitHub Search 🔍</h2>
      <div className={s.mainSearch}>
        <form
          /* onSubmit={(e) => searchGit(e)} */
          className={s.searchForm}
          action="#"
        >
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
      <div className={s.DivSort}> 
       <p>Сортировка:</p> 
       <div>
      <button data-testid="Asc-btn" className={s.Asc} onClick={numAscending}>Вниз</button>
      <button data-testid="Desc-btn" className={s.Desc}onClick={numDescending}>Вверх</button>
      </div>
      </div>
      <div className={s.DivCards}>
        {users ? (displayusers): (<p>Не найден пользователь</p>) }
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPages}
          onPageChange={changePage}
          containerClassName={s.navigationButtons}
          previousLinkClassName={s.previousButton}
          nextLinkClassName={s.nextButton}
          disabledClassName={s.navigationDisabled}
          activeClassName={s.navigationActive}
        />
      </div>
    </>
  );
};
export default Main;
