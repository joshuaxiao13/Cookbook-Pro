import React from 'react';
import img from './images/appExample.jpg';

const Home = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          paddingTop: '10rem',
          paddingLeft: '7rem',
        }}
      >
        <div>
          <h1>Cookbook Pro</h1>
          <br></br>
          <h5>Browse </h5>
          <h5>Share </h5>
          <h5>Create</h5>
          <h5>Inspire</h5>
          <h5>Designed for Recipes</h5>
          <br />
          <h6>Made for Home Cooks</h6>
        </div>
        <div style={{ marginLeft: '10%' }}>
          <img
            src={img}
            width='90%'
            style={{
              webkitFilter: 'drop-shadow(5px 5px 5px #222222)',
              filter: 'drop-shadow(4px 9px 5px #222222)',
              radius: '1000px',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
