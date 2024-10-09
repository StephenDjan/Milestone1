// frontend/src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';
import ProfileSettings from './components/ProfileSettings';
import ForgotPassword from './components/ForgotPassword';
import AdminPage from './components/AdminPage'; // Import the new admin page
import { UserContextprovider } from './components/providers/UserContext';

function App() {
    return (
      <UserContextprovider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Registration" element={<Registration />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/update-profile" element={<ProfileSettings />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
      </UserContextprovider>
    );
}

export default App;
