import { Modal, Button } from "react-bootstrap";
import "./modaldetails.css";

export default function CarModal({ car, show, handleClose }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      dialogClassName="car-modal-dialog"
    >
      <Modal.Header closeButton className="car-modal-header">
        <Modal.Title className="car-modal-title">
          {car.brand} {car.model}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="car-modal-body">
        <img
          src={`http://localhost:8000/uploads/${car.image}`}
          alt={car.model}
          className="car-modal-image"
        />
        <p className="car-modal-description">{car.description}</p>
        <p className="car-modal-year">Year: {car.year}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="car-modal-button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
