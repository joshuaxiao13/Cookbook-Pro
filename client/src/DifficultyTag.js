const DifficultyTag = ({ difficulty }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        backgroundColor:
          difficulty === 'easy'
            ? '#1d92d0'
            : difficulty === 'medium'
            ? 'orange'
            : '#d01dac',
        color: 'white',
        height: '28px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '5px',
      }}
    >
      {difficulty}
    </div>
  );
};

export default DifficultyTag;
