import { useEffect, useState } from "react";
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
/*   console.log(gitUser?.[2]?.items); */
  console.log(users?.items);

  //SORT
  const [sortUser, setSortUser] = useState(null);
  function numAscending() {
    users?.items?.sort((a, b) => a?.repos_url?.length - b?.repos_url?.length);
  return  setSortUser(sortUser + users?.items);
  }
  const [sortUsers, setSortUsers] = useState(null);
  function numDescending() {  
    users?.items?.sort(
      (a, b) => b?.repos_url?.length - a?.repos_url?.length
    );
    return  setSortUsers(sortUsers + users?.items);
  }

  //PAGINATINO
  const [page, setPage] = useState(0);
  const usersPerPage = 5;
  const numberOfusersVistited = page * usersPerPage;
  const displayusers = users?.items?.slice(numberOfusersVistited, numberOfusersVistited + usersPerPage)  
    .map((item) => {
      return <Card key={item.id} date={item} />;
    });
  const totalPages = Math.ceil(users?.items?.length / usersPerPage);
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
