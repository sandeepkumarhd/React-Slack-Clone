import React from "react";
import style from "./Random.module.css";
import axios from "axios";
import { FiUserPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";

const Random = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const userName = localStorage.getItem("userName")
  const newDate = new  Date()
  const time = newDate.toTimeString().slice(0,5)
  console.log(time);

  const getMessageFromFirebase = async () => {
    await axios
      .get(
        "https://slack-clone-a8dca-default-rtdb.firebaseio.com/randomMessage.json"
      )
      .then((respnse) => {
        let tranformed = [];
        for (let key in respnse.data) {
          let obj = {
            message: respnse.data[key].message,
            userName: respnse.data[key].userName,
            key: key,
            time:respnse.data[key].time,
          };
          tranformed.push(obj);
        }
        console.log(tranformed);
        setData(tranformed);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };
  useEffect(() => {
    getMessageFromFirebase();
  }, []);

  const firebaseMessageHandler = () => {
    const userEmailId = localStorage.getItem("userEmail");
    if (message.length <= 0) {
      alert("Write Something....!!");
    } else {
      axios
        .post(
          "https://slack-clone-a8dca-default-rtdb.firebaseio.com/randomMessage.json",
          {
            message: message,
            userName: userName,
            time : time,
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

  const deleteHandler = (key) => {
    axios
      .delete(
        `https://slack-clone-a8dca-default-rtdb.firebaseio.com/randomMessage/${key}.json`
      )
      .then((res) => {
        console.log(res);
        getMessageFromFirebase();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.general}>
      <section>
        <div className={style.generalChainal}>
          <span>#random</span>
          <div>
            <FiUserPlus />
          </div>
        </div>
        <hr />
        <div>
          <span className={style.bookmark}>
            <i className="fa-solid fa-plus"></i>
            Add a Bookmark
          </span>
        </div>
        <hr />
        <div className={style.notification}>
          <span>
            <i className="fa-solid fa-face-smile"></i>
            <span>
              This channel is for... well, everything else. It’s a place for
              team jokes, spur-of-the-moment ideas, and funny GIFs. Go wild!
            </span>
          </span>
        </div>
        <div className={style.mainSection}>
          {data.map((mes, index) => {
            return (
              <div key={index} className={style.random}>
                <div>
                  <p className={style.email2}>{mes.userName} {mes.time}</p>
                  <p className={style.messages2}>{mes.message}</p>
                </div>
                <i
                  className={`fa-sharp fa-solid fa-trash ${style.trash2}`}
                  onClick={() => deleteHandler(mes.key)}
                ></i>
              </div>
            );
          })}
        </div>
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

export default Random;
