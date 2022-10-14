import { createRoot } from 'react-dom/client';
import Routes from './app/Routes/Routes';
import './styles/main.scss';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Routes />);
