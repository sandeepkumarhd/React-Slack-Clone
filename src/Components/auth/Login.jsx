import { TfiEmail } from "react-icons/tfi";
import { FaLock } from "react-icons/fa";
import styles from "./Login.module.css";
import { IoLogoSlack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./Firebase";

const Login = () => {
  const nevegation = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        nevegation("/");
        window.location.reload(false);
        localStorage.setItem("user", response.user.accessToken);
        localStorage.setItem("userName",name)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  const toggleHandler = () => {
    nevegation("/");
  };
  const userNameHandler = (event) =>{
    setName(event.target.value)

  }
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div className={styles.header}>
          <h2>
            <IoLogoSlack /> <span>Slack-Login</span>{" "}
          </h2>
          <div>
            <i className={`fa-solid fa-file-signature ${styles.icon}`}></i>
            <input onChange={userNameHandler} placeholder="User Name" />
          </div>
          <div>
            <TfiEmail className={styles.icon} />
            <input onChange={emailChangeHandler} placeholder="User Email" />
          </div>
          <div>
            <FaLock className={styles.icon} />
            <input onChange={passwordChangeHandler} type={"password"} />
          </div>
          <button type="submit">Login</button>
          <p onClick={toggleHandler}>Register</p>
        </div>
      </form>
    </div>
  );
};
export default Login;
