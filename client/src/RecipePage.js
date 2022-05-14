import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import DifficultyTag from './DifficultyTag';

const RecipePage = ({ user }) => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/v1/users/${user.username}`)
      .then((res) => {
        setRecipe(res.data.user.recipes.find((rec) => rec._id == id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!recipe)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20%' }}>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div style={{ marginLeft: '7%', marginRight: '7%' }}>
      <div style={{ textAlign: 'center' }}>
        <br />
        <h1>{recipe.name}</h1>
        <br />
        <img src={recipe.imgURL} width='30%' />
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '15%',
          marginRight: '15%',
        }}
      >
        <h3>⏲️ {recipe.time} minutes</h3>
        <div style={{ display: 'flex' }}>
          <h5>Difficulty: </h5>
          <pre> </pre> <DifficultyTag difficulty={recipe.difficulty} />
        </div>
      </div>
      <br />
      <div style={{ marginLeft: '10%' }}>{recipe.description}</div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <h3>Ingredients 🥫</h3>
          <ul style={{ listStyle: 'none' }}>
            {recipe &&
              recipe.ingredients.split(',').map((ing) => {
                return (
                  <li>
                    <input type='checkbox' /> {ing.trim()}
                  </li>
                );
              })}
          </ul>
        </div>
        <div>
          <h3>Steps</h3>
          <ol>
            {recipe &&
              recipe.steps.split('.').map((step) => {
                return <li>{step.trim()}</li>;
              })}
          </ol>
        </div>
      </div>
      <br />
    </div>
  );
};

export default RecipePage;
