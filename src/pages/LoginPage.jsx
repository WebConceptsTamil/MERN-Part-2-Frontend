import { useState, useRef, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginAPIMutation } from "../store/slices/userApiSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginAPI, { isLoading }] = useLoginAPIMutation();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastId = useRef(null);

  const loginHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Email and password is required");
      }
      return;
    }
    try {
      const response = await loginAPI({ email, password }).unwrap();
      dispatch(login({ ...response }));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [navigate, isLoggedIn]);
  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Login</h1>
      <Form>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={loginHandler}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
