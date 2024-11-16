import './styles/App.css';
import HomePage from './page/page';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Yune inc Test Page"; // 원하는 제목으로 설정
  }, []);
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
