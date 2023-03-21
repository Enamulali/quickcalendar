import { useState } from "react";
import SliderToggle from "../components/SliderToggle";
import CalendarEvents from "../components/CalendarEvents";
import ListEvents from "../components/ListEvents";
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = ({ events }) => {
  const [view, setView] = useState("list");

  const handleViewChange = (isChecked) => {
    setView(isChecked ? "calendar" : "list");
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h1>Welcome to your calendar</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <SliderToggle onChange={handleViewChange} setView={setView} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {view === "list" ? (
            <ListEvents events={events} />
          ) : (
            <CalendarEvents events={events} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
