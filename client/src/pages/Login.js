import React, { Fragment, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  fetching,
  loginFailed,
  userSelector,
} from "../feature/UserSlice";
import { useForm } from "../utils/util";
import { useHistory, Link } from "react-router-dom";
import { login } from "../utils/auth";

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { errorMessage, isError, isFetching } = useSelector(userSelector);
  const submitLogin = async () => {
    try {
      dispatch(fetching());
      //fetching here
      const {
        data: { data },
      } = await login({
        email: values.email,
        password: values.password,
      });
      //changing state for
      localStorage.setItem("jwt", `Bearer ${data.token}`);
      dispatch(
        loginSuccess({
          username: data.user.name,
          email: data.user.email,
          token: data.token,
        })
      );
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      dispatch(loginFailed({ errorMessage: err.response.data.message }));
    }
  };
  const { onChange, onSubmit, values } = useForm(submitLogin, {
    email: "",
    password: "",
    remember: "checked",
  });
  return (
    <Container>
      <div className="login-title">
        <h3>Login</h3>
      </div>
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            value={values.email}
            placeholder="Enter email"
            onChange={onChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={onChange}
            value={values.password}
            required
          />
          {isError && <span>{errorMessage}</span>}
          {isFetching ? <span>Loading...</span> : ""}
          <div className="form-submit">
            <label>
              <input
                type="checkbox"
                checked={values.remember}
                onChange={onChange}
                name="remember"
              />{" "}
              Remember me
            </label>

            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
      <div className="other-links">
        <Link to="/signup">Sign-up</Link>?
      </div>
    </Container>
  );
}
