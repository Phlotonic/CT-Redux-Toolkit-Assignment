import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateExercise } from '../slices/exercisesSlice';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';

function UpdateExercise() {
  const exercises = useSelector((state) => state.exercises.exercises);
  const dispatch = useDispatch();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [updatedExercise, setUpdatedExercise] = useState({ type: '', duration: '', calories: '' });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateExercise({ ...updatedExercise, id: selectedExercise.id }));
    setSelectedExercise(null);
    setUpdatedExercise({ type: '', duration: '', calories: '' });
  };

  return (
    <Container className="mt-5">
      <h2>Update Exercise</h2>
      <ListGroup className="mt-3">
        {exercises.map((ex) => (
          <ListGroup.Item key={ex.id} onClick={() => setSelectedExercise(ex)}>
            {ex.type} - {ex.duration} minutes - {ex.calories} calories
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedExercise && (
        <Form onSubmit={handleUpdate} className="mt-3">
          <Form.Group>
            <Form.Label>Type of Exercise</Form.Label>
            <Form.Control
              type="text"
              value={updatedExercise.type}
              onChange={(e) => setUpdatedExercise({ ...updatedExercise, type: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={updatedExercise.duration}
              onChange={(e) => setUpdatedExercise({ ...updatedExercise, duration: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Calories Burned</Form.Label>
            <Form.Control
              type="number"
              value={updatedExercise.calories}
              onChange={(e) => setUpdatedExercise({ ...updatedExercise, calories: e.target.value })}
            />
          </Form.Group>
          <Button type="submit" className="mt-3">Update Exercise</Button>
        </Form>
      )}
    </Container>
  );
}

export default UpdateExercise;
