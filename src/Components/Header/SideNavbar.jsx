import style from "./SideNavBar.module.css";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { chainalActions } from "../ReduxStore/chainal";
import {FiEdit} from "react-icons/fi"
import {IoIosArrowDropdown} from "react-icons/io"
import { useNavigate } from "react-router-dom";
import {MdOutlineHistory} from "react-icons/md"
import {FaUserSecret} from "react-icons/fa"
import {BiHelpCircle} from "react-icons/bi"
import {GoDiffAdded} from "react-icons/go"

const SideNavBar = () => {
  const dispatch = useDispatch()
  const [chainal, setChainal] = useState([]);
  const [isChainal, setIsChainal] = useState(false);
  const [name, setName] = useState("");
  const nevegation = useNavigate();
  // const chainals = useSelector((state) => state.addChainal.chainal)
  // console.log(chainals);
  // let chainals = [];
  useEffect(() =>{
    let allNewChainal1 = JSON.parse(localStorage.getItem("chainals")) || [];
    setChainal(allNewChainal1)
  },[])
  const generalHandeler = () => {
    nevegation("/general");
  };
  const newChainalhandler = () =>{
    nevegation("newChainal")
  }
  const logoutHandler = () => {
    localStorage.removeItem("user");
    nevegation("/login");
    window.location.reload(false);
  };
  const addChainalHandler = () => {
    setIsChainal(true);
  };
  const addChainalHandler2 = () => {
    setIsChainal(false);
    let obj = {
      name: name,
      id:Math.random().toFixed(4)
    };

    let allNewChainal = JSON.parse(localStorage.getItem("chainals")) || [];
    allNewChainal.push(obj)
    localStorage.setItem("chainals",JSON.stringify(allNewChainal))
    setChainal(allNewChainal)
    dispatch(chainalActions.addChaninal(obj))
  };
  const inputHandler = (event) => {
    setName(event.target.value);
  };
  const allChainal = chainal.map((chainal,index) => {
    return <li className={style.new}  key={index}> # {chainal.name} <i className="fa-solid fa-trash"></i></li>;
  });
  return (
    <aside>
      <div className={style.searchBox}>
        <span> <MdOutlineHistory className={style.historyIcons}/></span>
     
        <input placeholder="Search HDCB"/>
        <span>   <BiHelpCircle className={style.userIcons}/></span>
        <span><FaUserSecret className={style.userIcons}/></span>
     
        
      </div>
      <nav>
        <ul>
          <div className={style.chainalName}>
          <span>HDCB <IoIosArrowDropdown/></span>
          <FiEdit className={style.edtiIcon}/>
          </div>
          
          <hr/>
          <li onClick={generalHandeler}># general</li>
          <li onClick={newChainalhandler}># random</li>
          <li onClick={logoutHandler}># Logout</li>
          {isChainal ? (
            <div>
              {" "}
              <input onChange={inputHandler} />{" "}
              <GoDiffAdded onClick={addChainalHandler2} className={style.addIcon}/>
            </div>
          ) : (
            <li onClick={addChainalHandler}><i className="fa-solid fa-caret-down"></i> add chainal</li>
          )}
          {allChainal}
          <li> <IoIosArrowDropdown/> Direct Message</li>
        </ul>
      </nav>
    </aside>
  );
};
export default SideNavBar;
