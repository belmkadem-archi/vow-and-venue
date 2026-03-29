import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TemplatePicker from './pages/TemplatePicker';
import BuilderPage from './pages/BuilderPage';
import UnboxingPreview from './pages/UnboxingPreview';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/templates" element={<TemplatePicker />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/preview" element={<UnboxingPreview />} />
      {/* Dynamic preview route */}
      <Route path="/v/:id" element={<UnboxingPreview />} />
    </Routes>
  );
}

export default App;
