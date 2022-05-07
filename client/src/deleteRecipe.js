import axios from 'axios';

const deleteRecipe = (username, id) => {
  axios
    .delete(`${process.env.API_URL}/api/v1/users/${username}`, {
      data: { id: id },
    })
    .then((res) => {})
    .catch((error) => console.log(error));
};

export default deleteRecipe;
