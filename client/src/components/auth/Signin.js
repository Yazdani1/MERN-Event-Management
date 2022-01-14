import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { signIn } from "./apiAuth";
import { SyncOutlined } from "@ant-design/icons";
import { UserContext } from "../UserContext";

function SignIn() {
  const [state, setState] = useContext(UserContext);

  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  // const [state, setState] = useContext(UserContext);

  const { email, password, error } = data;
  const handleChange = (e) => {
    setData({
      ...data,
      error: false,
      [e.target.name]: e.target.value,
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    setData({ ...data, error: false });

    setLoading(true);

    signIn({ email, password })
      .then((result) => {
        if (result.error) {
          setData({ ...data, error: result.error });
          setLoading(false);
        } else {
          console.log(result);
          
          //update user information
          setState({
            user: result.user,
            token: result.token
          });

          //save user info in local storage
          window.localStorage.setItem("tokenLogin", JSON.stringify(result));



          history.push("/dashboard");
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  if (window.localStorage.getItem("tokenLogin")) {
    history.push("/dashboard");
  }

  //useRef for focus on the input fields.

  const emailRef = useRef(null);
  const passworRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const emailKeyDown = (e) => {
    if (e.key === "Enter") {
      passworRef.current.focus();
    }
  };

  const passwordKeyDown = (e) => {
    if (e.key === "Enter") {
      submitButtonRef.current.focus();
    }
  };

  // const buttonKeyDown = () => {};

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="form-design card">
              <form>
                <div className="text-center">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png"
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                  <h5 className="text-center">Sign In To Your Account</h5>
                </div>
                {errorMessage()}
                <div className="form-group">
                  <input
                    type="text"
                    onKeyDown={emailKeyDown}
                    ref={emailRef}
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Your E-mail *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onKeyDown={passwordKeyDown}
                    ref={passworRef}
                    name="password"
                    value={password}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Password*"
                  />
                </div>

                <div class="form-group justify-content-center align-items-center">
                  <button
                    type="submit"
                    // onKeyDown={buttonKeyDown}
                    ref={submitButtonRef}
                    name="btnSubmit"
                    className="btnContact"
                    value="Sign In"
                    onClick={(e) => {
                      submitData(e);
                    }}
                  >
                    {loading ? <SyncOutlined spin /> : "Sign In"}
                  </button>
                </div>
                <div className="text-center form-bottom-title">
                  <Link to={"/reset"} style={{ textDecoration: "none" }}>
                    <p>Forgot password?</p>
                  </Link>
                  <Link to={"/signup"} style={{ textDecoration: "none" }}>
                    <p>Don't have an account? Create now</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
