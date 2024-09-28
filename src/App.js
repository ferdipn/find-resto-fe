import './App.css';

import AppRoute from './routes/main';
import {
    BrowserRouter as Router,
} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoute />
            </Router>
        </AuthProvider>
    );

    
}

export default App;
