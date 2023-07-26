import './App.css';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

function App() {
  return (
    <Auth0Provider
        domain="dev-jq0f41r6txfpceni.us.auth0.com"
        clientId="9nntVp5GtXVtct7qJHIJiOF1JKAEPQYX"
        authorizationParams={{
        redirect_uri: window.location.origin
        }}
    >
        <div className="App">
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/search-results" element={<SearchPage/>}/>
        </Routes>
        </BrowserRouter>
        </div>
    </Auth0Provider>    
  );
}

export default App;
