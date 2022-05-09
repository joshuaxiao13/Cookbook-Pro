import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AddRecipeModal from './AddRecipeModal';
import EditRecipeModal from './EditRecipeModal';
import DifficultyTag from './DifficultyTag';
import deleteRecipe from './deleteRecipe';
import sendReviewRequest from './sendReviewRequest';
import Notification from './Notification';

const Cookbook = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/v1/users/${user.username}`)
      .then((res) => {
        setRecipes(res.data.user.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.username]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '15%' }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <>
        <AddRecipeModal
          username={user.username}
          pushRecipe={(newRecipe) => setRecipes([...recipes, newRecipe])}
        />
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '20%' }}
        >
          <h1>Looking empty 🥄 Go ahead and add your first recipe 😋</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <AddRecipeModal
          username={user.username}
          pushRecipe={(newRecipe) => setRecipes([...recipes, newRecipe])}
        />
        <div style={{ marginLeft: '15%', marginBottom: '1%', marginTop: '1%' }}>
          <h2>
            Hello there,{' '}
            {user.name.indexOf(' ') === -1
              ? user.name
              : user.name.substring(0, user.name.indexOf(' '))}
          </h2>
        </div>
      </div>
      <div
        style={{
          paddingLeft: '4%',
          margin: 'auto',
          width: '80%',
          display: 'table',
        }}
      >
        <Row md='auto' stye={{ margin: '0 auto' }}>
          {recipes.map((recipe) => {
            const { name, imgURL, description, _id, time, difficulty } = recipe;
            return (
              <>
                <div
                  key={_id}
                  className='d-flex justify-content-around'
                  style={{ margin: '1rem' }}
                >
                  <Card
                    bg='light'
                    style={{
                      width: '300px',
                      margin: 'auto',
                    }}
                  >
                    <LinkContainer
                      to={`/mycookbook/${_id}`}
                      style={{
                        objectFit: 'cover',
                        height: '200px',
                        cursor: 'pointer',
                      }}
                      title='view recipe'
                    >
                      <Card.Img variant='top' src={imgURL} />
                    </LinkContainer>
                    <Card.Body style={{ height: '140px' }}>
                      <Card.Title>{name}</Card.Title>
                      <Card.Text
                        style={{
                          display: '-webkit-box',
                          webkitLineClamp: '3',
                          webkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {description}
                      </Card.Text>
                    </Card.Body>
                    <div
                      style={{
                        marginLeft: '15px',
                        marginRight: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Card.Text>
                        <i class='bi bi-alarm'>
                          {'  '}
                          {time} min
                        </i>
                      </Card.Text>
                      <DifficultyTag difficulty={difficulty} />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '8px',
                      }}
                    >
                      <i
                        title='delete'
                        className='bi bi-trash3'
                        style={{ cursor: 'pointer', color: 'red' }}
                        onClick={() => {
                          deleteRecipe(user.username, _id);
                          setRecipes(
                            recipes.filter((recipe) => recipe._id !== _id)
                          );
                        }}
                      ></i>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '16%',
                        }}
                      >
                        <EditRecipeModal
                          username={user.username}
                          recipe={recipe}
                          setRecipes={setRecipes}
                        />
                        <i
                          title='make public'
                          className='bi bi-globe'
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            sendReviewRequest(user.username, recipe);
                            setNotifs((oldNotifs) => [...oldNotifs, name]);
                          }}
                        ></i>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            );
          })}
        </Row>
      </div>
      <Notification
        notifs={notifs}
        removeNotif={(recipeName) =>
          setNotifs((oldNotifs) =>
            oldNotifs.filter((name) => recipeName !== name)
          )
        }
      />
    </>
  );
};

export default Cookbook;
