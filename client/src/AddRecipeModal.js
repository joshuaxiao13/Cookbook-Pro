import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddRecipeModal = ({ username, pushRecipe }) => {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let [name, time, description, ingredients, steps, imgURL, difficulty] = [
      'name',
      'time',
      'description',
      'ingredients',
      'steps',
      'imgURL',
      'difficulty',
    ].map((field) => formData.get(field));
    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/v1/users/${username}`, {
        recipe: {
          name,
          time,
          description,
          ingredients,
          steps,
          imgURL,
          difficulty,
        },
      })
      .then((res) => {
        handleClose();
        pushRecipe({
          name,
          time,
          description,
          ingredients,
          steps,
          imgURL,
          difficulty,
        });
      })
      .catch((error) => {
        console.log(error);
        setMsg('make sure to fill out all fields properly');
      });
  };

  return (
    <>
      <Button
        title='add Recipe'
        className='rounded-circle'
        variant='success'
        style={{
          marginLeft: '93%',
          marginTop: '43%',
          position: 'fixed',
        }}
        onClick={handleShow}
      >
        <i className='bi bi-plus'></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered='true' size='md'>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Your Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className='mb-3'>
              <Form.Label>Dish Name</Form.Label>
              <Form.Control
                placeholder='Enter dish name'
                name='name'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Cooking Time</Form.Label>
              <Form.Control
                placeholder='Enter in minutes - Ex. 15'
                name='time'
                autoComplete='off'
                required
                type='number'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                aria-label='Default select example'
                name='difficulty'
                style={{ marginBottom: '16px' }}
              >
                <option value='easy'>easy</option>
                <option value='medium'>medium</option>
                <option value='hard'>hard</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Describe what makes your dish so delicious!'
                name='description'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='2 tbsp. freshly chopped parsley, 2 tsp. freshly chopped thyme, 1 tbsp. extra-virgin olive oil, 2 cloves minced garlic, 8 slices crusty bread, 1/2 cup herb mayo, 1/4 cup Dijon mustard, 1 tomato thinly sliced, 1/2 red onion thinly sliced'
                name='ingredients'
                autoComplete='off'
                required
              />
              <Form.Text>
                A comma will be used to seperate ingredients
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Steps</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='In a medium bowl whisk together mayonnaise, parsley, and garlic. Spread 1 tablespoon mustard on the other 4 slices of bread. Top each mayo slice of bread with 3 slices of ham, a couple slices of tomato, and red onion. Top the bread with mustard side down.'
                name='steps'
                autoComplete='off'
                required
              />
              <Form.Text>
                A period will be used to seperate each instruction
              </Form.Text>
              <Form.Text className='text-muted'></Form.Text>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Image Address/URL</Form.Label>
              <Form.Control
                placeholder='Enter image address'
                name='imgURL'
                autoComplete='off'
                required
              />
              <Form.Text className='text-muted'>
                <br />
                Tutorial on{' '}
                <a
                  href='https://support.google.com/websearch/answer/118238?hl=en'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  accessing image address
                </a>
                {' - '}
                Source: Example reciple from{' '}
                <a
                  href='https://www.delish.com/cooking/recipe-ideas/a26966279/ham-sandwich-recipe/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Delish
                </a>
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>
              Save
            </Button>
            {msg !== null && (
              <Modal.Text style={{ color: 'red' }}>{msg}</Modal.Text>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddRecipeModal;
