import { Container, Row, Col } from 'react-bootstrap';
import ApplicantForm from './components/ApplicantForm/ApplicantForm';

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} sm={12}>
            <ApplicantForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
