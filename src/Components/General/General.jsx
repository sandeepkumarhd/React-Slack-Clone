import style from "./General.module.css";
import { BsStopwatch } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";

const General = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const firebaseMessageHandler = () => {
    const userEmailId = localStorage.getItem("userEmail");
    if (message.length <= 0) {
      alert("Write Something....!!");
    } else {
      axios
        .post(
          "https://react-slack-clone-f7ae6-default-rtdb.firebaseio.com/generalMessage.json",
          {
            message: message,
            userEmailId: userEmailId,
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
        "https://react-slack-clone-f7ae6-default-rtdb.firebaseio.com/generalMessage.json"
      )
      .then((respnse) => {
        let tranformed = [];
        for (let key in respnse.data) {
          let obj = {
            message: respnse.data[key].message,
            email: respnse.data[key].userEmailId,
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

  const allMessages = data.map((mes,index) => {
    return (
      <div key={index}>
        <main>
          <p className={style.email}>{mes.email}</p>
          <p className={style.messages}>{mes.message}</p>
        </main>
      </div>
    );
  });
  return (
    <div className={style.general}>
      <section>
        <div className={style.search}>
          <BsStopwatch className={style.watch} />
          <input type={"search"} />
        </div>
        <div className={style.allMessages}>{allMessages}</div>

        <div className={style.newMessage}>
          <input
            onChange={(event) => setMessage(event.target.value)}
            type={"text"}
            value={message}
          />
          <button onClick={firebaseMessageHandler}>Send</button>
        </div>
      </section>
    </div>
  );
};
export default General;
