import { useSelector } from "react-redux";
import s from "./Card.module.css"
import { Link } from "react-router-dom";
import { useState } from "react";


const Card = ({date,displayusers}) => { 
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown(current => !current);
  }
  const handlehref = () =>{
    window.location.href = `${date?.html_url}`
  }
  return (
    <>
      <ul  id={s.card}>
        <li className={s.personal}>
        <div className={s.avatar}>
         <img  src={date?.avatar_url} alt={date?.login} />
      </div>
      <li className={s.nameHolder}>{date?.login}
      </li>
        </li>
        <li className={s.info}>
     <li data-testid="list-item"> Repositories:{date?.repos_url?.length} </li>
         <button className={s.othBut} onClick={handleClick}>Подробности</button>
      </li>
      {isShown && (
      <li className={s.followers}>
        <Link onClick={handlehref} >Профиль на GitHub</Link> 
        <span> Followers: {date?.followers_url?.length} </span> 
        <span> Following: {date?.following_url?.length} </span> 
        <span> Stars: {date?.starred_url?.length} </span> 
         </li>
          )}
         </ul>
    </>
  );
};

export default Card;
