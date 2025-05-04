import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1>Moim Golfscore</h1>
      <p>This is the beginning of something fun!</p>
      <button onClick={() => navigate('/score')}>Start Scoring</button>
    </div>
  );
}

export default App;
