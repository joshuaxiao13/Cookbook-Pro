import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import DifficultyTag from './DifficultyTag';
import { LinkContainer } from 'react-router-bootstrap';

const Browse = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/v1/users/public`)
      .then((res) => {
        setRecipes(res.data.user.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '20%' }}
        >
          <h1>🥄 No public recipes available</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ marginLeft: '15%', marginTop: '1%' }}>
        <h2>Browse</h2>
        <div>
          Here, you'll find recipes from other users. Feel free to make your own
          recipes public. Simply head over to your cookbook and click{' '}
          <i title='make public' className='bi bi-globe'></i> on the desired
          recipe.
        </div>
        <div>
          Your recipe will then be reviwed by one of our moderators to check for
          quality and any typos ✔️
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
            const {
              name,
              imgURL,
              description,
              _id,
              time,
              difficulty,
              username,
            } = recipe;
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
                      to={`/browse/${_id}`}
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
                    <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
                      <i class='bi bi-person-circle'></i>{' '}
                      {username || 'unknown'}
                    </div>
                  </Card>
                </div>
              </>
            );
          })}
        </Row>
      </div>
    </>
  );
};

export default Browse;
