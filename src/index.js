import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/js/dist/dropdown';
import '../node_modules/bootstrap/js/dist/modal';
import '../node_modules/bootstrap/js/dist/alert';
import { TweetsContextProvider } from './context/TweetsContext';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationsContextProvider } from './context/NotificationContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { MessagesContextProvider } from './context/MessagesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <TweetsContextProvider>
      <CommentsContextProvider>
        <MessagesContextProvider>
          <NotificationsContextProvider>
            <App />
          </NotificationsContextProvider>
        </MessagesContextProvider>
      </CommentsContextProvider>
    </TweetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);