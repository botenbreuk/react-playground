import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import App from '../App/App';
import CardBigPage from '../Cards/CardBigPage';
import CardsPage from '../Cards/CardsPage';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
import ShuffleList from '../Shuffle/ShuffleList';

export default function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<App />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/cards/big" element={<CardBigPage />} />
        <Route path="/shuffle" element={<ShuffleList />} />
        <Route path="/dnd" element={<Dnd />} />
        <Route path="/dnd-sort" element={<DndExample />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}
