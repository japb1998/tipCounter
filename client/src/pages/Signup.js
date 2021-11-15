import React, { Fragment, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useForm } from "../utils/util";
import { useSelector, useDispatch } from "react-redux";
import {
  clearState,
  fetching,
  loginSuccess,
  logout,
  loginFailed,
  userSelector,
} from "../feature/UserSlice";
import { useHistory, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Alert } from "bootstrap";
import { signup } from "../utils/auth";

export default function Signup() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  const submitSignup = async () => {
    try {
      dispatch(fetching());
      const {
        data: { data },
      } = await signup(values);
      // console.log(data)
      localStorage.setItem('jwt',`Bearer ${data.token}`);
      dispatch(
        loginSuccess({ email: data.user.email, username: data.user.username })
      );
    } catch (err) {
      console.log(err.response.data);
      dispatch(loginFailed({ errorMessage: err.response.data.message }));
    }
  };
  const { onChange, onSubmit, values } = useForm(submitSignup, {
    username: "",
    password: "",
    email: "",
    name: "",
  });

  return (
    <Container>
      <div className="login-title">
        <h3>Sign up</h3>
      </div>
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <label htmlFor="name">E-mail</label>
          <input
            type="text"
            name="email"
            value={values.email}
            placeholder="Enter name"
            onChange={onChange}
            required
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            placeholder="name"
            onChange={onChange}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={values.username}
            placeholder="Enter Username"
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

          {/* {values} */}
          <Button type="submit">Sign-up</Button>
        </form>
      </div>

      <div className="other-links">
        <Link to="/login">Sign-in</Link>?
      </div>
    </Container>
  );
}
