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
      <Row>
        <Col>
          <SliderToggle onChange={handleViewChange} setView={setView} />
        </Col>
      </Row>
      <Row>
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
