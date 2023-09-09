import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NavigationMenu from './components/Sidebar';
import LoginPage from './pages/users/Login';
import SignupPage from './pages/users/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import TrendingBar from './components/TrendingBar';
import ShowProfile from './pages/users/profile/Profile';
import NotificationsPage from './pages/notifications/Notifications';
import ShowTweetPage from './pages/tweets/ShowTweet';
import TweetFormModal from './components/TweetModal';
import ShowChats from './pages/messages/ShowChats';
import MessagePage from './pages/messages/MessagePage';
import EditProfilePage from './pages/users/profile/EditProfile';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      {user && (
        <NavigationMenu/>
      )}
        <TweetFormModal/>
        <Routes>
            <Route
              path="/"
              element={user? <Home/> : <Navigate to="/login"/>}
            />
            <Route
              path="/tweets/:tweetId"
              element={user? <ShowTweetPage/> : <LoginPage/>}
            />
            <Route
              path="/:profileName"
              element={user? <ShowProfile/> : <LoginPage/>}
            />
            <Route
              path="/notifications"
              element={user? <NotificationsPage/> : <LoginPage/>}
            />
            <Route
              path="/messages"
              element={user? <ShowChats/> : <LoginPage/>}
            />
            <Route
              path="/messages/:receiverUsername"
              element={user? <MessagePage/> : <LoginPage/>}
            />
            <Route
              path="/profile/edit"
              element={user? <EditProfilePage/> : <LoginPage/>}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <SignupPage/> : <Navigate to="/"/>}
            />
        </Routes>
      {user && (
        <TrendingBar/>
      )}
    </BrowserRouter>    
  );
}

export default App;
