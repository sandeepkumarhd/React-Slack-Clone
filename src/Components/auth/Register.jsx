import { FaUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import styles from "./Login.module.css";
import { IoLogoSlack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./Firebase";

const Register = () => {
  const nevigation = useNavigate();
  console.log(nevigation);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        nevigation("/login");
        console.log(response);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  const toggleHandler = () =>{
    nevigation("/login")
  }
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div className={styles.header}>
          <h2>
            <IoLogoSlack /> <span>Slack</span>{" "}
          </h2>
          <div>
            <FaUser className={styles.icon} />
            <input placeholder="User Name" />
          </div>
          <div>
            <TfiEmail className={styles.icon} />
            <input onChange={emailChangeHandler} placeholder="User Email" />
          </div>
          <div>
            <FaLock className={styles.icon} />
            <input onChange={passwordChangeHandler} type={"password"} />
          </div>
          <button>Register </button>
          <p onClick={toggleHandler}>Login</p>
        </div>
      </form>
    </div>
  );
};
export default Register;
