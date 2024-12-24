import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExercise, deleteExercise, updateExercise } from '../slices/exercisesSlice';
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';

function Exercises() {
  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();
  const [exercise, setExercise] = useState({ type: '', duration: '', calories: '' });
  const [showModal, setShowModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExercise({ ...exercise, id: Date.now() }));
    setExercise({ type: '', duration: '', calories: '' });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateExercise({ ...selectedExercise, ...exercise }));
    setShowModal(false);
    setExercise({ type: '', duration: '', calories: '' });
  };

  const handleEditClick = (exercise) => {
    setSelectedExercise(exercise);
    setExercise({ type: exercise.type, duration: exercise.duration, calories: exercise.calories });
    setShowModal(true);
  };

  return (
    <Container className="mt-5">
      <h2>Exercise Log</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Type of Exercise</Form.Label>
          <Form.Control
            type="text"
            value={exercise.type}
            onChange={(e) => setExercise({ ...exercise, type: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={exercise.duration}
            onChange={(e) => setExercise({ ...exercise, duration: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Calories Burned</Form.Label>
          <Form.Control
            type="number"
            value={exercise.calories}
            onChange={(e) => setExercise({ ...exercise, calories: e.target.value })}
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Add Exercise</Button>
      </Form>
      <ListGroup className="mt-3">
        {exercises.map((ex) => (
          <ListGroup.Item key={ex.id}>
            {ex.type} - {ex.duration} minutes - {ex.calories} calories
            <Button
              variant="danger"
              className="float-end"
              onClick={() => dispatch(deleteExercise(ex.id))}
            >
              Delete
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              onClick={() => handleEditClick(ex)}
            >
              Edit
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group>
              <Form.Label>Type of Exercise</Form.Label>
              <Form.Control
                type="text"
                value={exercise.type}
                onChange={(e) => setExercise({ ...exercise, type: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={exercise.duration}
                onChange={(e) => setExercise({ ...exercise, duration: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Calories Burned</Form.Label>
              <Form.Control
                type="number"
                value={exercise.calories}
                onChange={(e) => setExercise({ ...exercise, calories: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" className="mt-3">Update Exercise</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Exercises;

