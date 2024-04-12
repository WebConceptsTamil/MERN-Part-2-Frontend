import { Link } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { Row, Col, Button, Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="card p-5 text-center">
            <p className="display-6 mb-4">Oops! something went wrong.</p>
            <p>The page you requested was not found - 404 Error</p>
            <Link to="/">Go back</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorPage;
