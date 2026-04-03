import { Routes, Route } from 'react-router-dom';
import MainApp from './pages/MainApp';
import LiveGuestView from './pages/LiveGuestView';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import './App.css';

function App() {
  return (
    <Routes>
      {/* The main route handles Landing, Builder, and Preview dynamically exactly like the MVP HTML */}
      <Route path="/" element={<MainApp />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      {/* Dynamic preview route for actual guests resolving a published invite */}
      <Route path="/v/:id" element={<LiveGuestView />} />
    </Routes>
  );
}

export default App;
