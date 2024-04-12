import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { login } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileAPIMutation } from "../store/slices/userApiSlice";

const UpdateProfilePage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state) => state.auth);

  const [updateProfileAPI, { isLoading }] = useUpdateProfileAPIMutation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateHandler = async (event) => {
    event.preventDefault();
    // if (!name || !password || !confirmPassword) {
    //   toast.error("All fields are required");
    //   return;
    // }
    if (password !== confirmPassword) {
      toast.error("Password & confirm password should match");
      return;
    }
    try {
      const response = await updateProfileAPI({ name, password }).unwrap();
      dispatch(login({ ...response }));
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    setName(userData.name);
  }, [userData.name]);

  return (
    <FormContainer>
      <h1 className="text-center fw-bold mb-3 text-primary">Update</h1>
      <Form>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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

        <Form.Group className="my-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          onClick={updateHandler}
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
            "Update"
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UpdateProfilePage;
