import TaskListPage from './pages/TaskListPage';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={TaskListPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
