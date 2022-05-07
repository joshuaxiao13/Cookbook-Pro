import axios from 'axios';

const sendReviewRequest = (username, recipe) => {
  axios
    .post(`${process.env.API_URL}/api/v1/moderator`, {
      recipe: { ...recipe, username },
    })
    .then((res) => {})
    .catch((error) => console.log(error));
};

export default sendReviewRequest;
