import style from "./General.module.css";
import { BsStopwatch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";
import { BsFillSendFill } from "react-icons/bs";

import axios from "axios";

const General = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const deleteHandler = (key) => {
    axios
      .delete(
        `https://slack-clone-a8dca-default-rtdb.firebaseio.com/generalMessage/${key}.json`
      )
      .then((res) => {
        console.log(res);
        getMessageFromFirebase();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const firebaseMessageHandler = () => {
    const userName = localStorage.getItem("userName");
    if (message.length <= 0) {
      alert("Write Something....!!");
    } else {
      axios
        .post(
          "https://slack-clone-a8dca-default-rtdb.firebaseio.com/generalMessage.json",
          {
            message: message,
            userName: userName,
          }
        )
        .then((success) => {
          getMessageFromFirebase();
          setMessage("");
          console.log(success);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const getMessageFromFirebase = async () => {
    await axios
      .get(
        "https://slack-clone-a8dca-default-rtdb.firebaseio.com/generalMessage.json"
      )
      .then((respnse) => {
        let tranformed = [];
        for (let key in respnse.data) {
          let obj = {
            message: respnse.data[key].message,
            name: respnse.data[key].userName,
            key: key,
          };
          tranformed.push(obj);
        }
        setData(tranformed);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  useEffect(() => {
    getMessageFromFirebase();
  }, []);

  const allMessages = data.map((mes, index) => {
    return (
      <div key={index} className={style.mainMessage}>
        <main>
          <div>
            <p className={style.email}>{mes.name}</p>
            <p className={style.messages}>{mes.message}</p>
          </div>
          <i
            className={`fa-sharp fa-solid fa-trash ${style.trash}`}
            onClick={() => deleteHandler(mes.key)}
          ></i>
        </main>
      </div>
    );
  });
  const searchUserWithEmail = async () => {
    if (searchInput.length > 0) {
      const user = data.filter((item) => item.email.includes(searchInput));
      setData(user);
    }
  };
  return (
    <div className={style.general}>
      <section>
        <div className={style.search}></div>
        <div className={style.generalChainal}>
          <span>
            #general <IoIosArrowDropdown />
          </span>
          <div>
            <FiUserPlus />
          </div>
        </div>
        <hr />
        <div>
          <span className={style.bookmark}>
            <AiOutlinePlus />
            Add a Bookmark
          </span>
        </div>
        <hr />
        <div className={style.notification}>
          <span>
            <TfiAnnouncement />
            <span>
              You’re looking at the #general channel
              <span>
                This is the one channel that will always include everyone. It’s
                a great spot for announcements and team-wide conversations. Edit
                description
              </span>
            </span>
          </span>
        </div>
        <div className={style.message}>{allMessages}</div>
        <div className={style.newMessage}>
          <input
            onChange={(event) => setMessage(event.target.value)}
            type={"text"}
            value={message}
          />
          <BsFillSendFill
            onClick={firebaseMessageHandler}
            className={style.sendIcon}
          />
        </div>
      </section>
    </div>
  );
};
export default General;
