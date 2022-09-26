import 'bootstrap/dist/css/bootstrap.min.css';

import { createRoot } from 'react-dom/client';
import Routes from './app/Routes/Routes';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<Routes />);
