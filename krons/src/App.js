import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Partner from './components/Partner';
import Item from './components/Item';
import Settings from './components/Settings';
import Login from './components/Login';
import Move from './components/Move';
import Project from './components/Project';
import Received from './components/Received';
import SQLQueryForm from './components/SQLQueryForm';
import Header from './components/Header';
import PageNotFound from './components/PageNotFound';
import './index.css';
import './App.css';
import DocOut from './components/DocOut';
import { AuthContext, AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Users from './components/Users';
import DocList from './components/DocList';
import PasswordReset from './components/PasswordReset';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      {isLoggedIn && <Sidebar />}
      <div className={isLoggedIn ? 'main-content bg-gray-100 p-4' : 'bg-gray-100 full-content'}>
        <Routes>
          <Route path="/mozgaskod" element={<PrivateRoute element={<Move />} extraCheck={true} />} />
          <Route path="/beallitas" element={<PrivateRoute element={<Settings />} extraCheck={true} />} />
          <Route path="/ujbevetel" element={<PrivateRoute element={<Received />} />} />
          <Route path="/partnertorzs" element={<PrivateRoute element={<Partner />} />} />
          <Route path="/kiadas" element={<PrivateRoute element={<DocOut />} />} />
          <Route path="/cikktorzs" element={<PrivateRoute element={<Item />} />} />
          <Route path="/projekt" element={<PrivateRoute element={<Project />} extraCheck={true} />} />
          <Route path="/export" element={<PrivateRoute element={<SQLQueryForm />} extraCheck={true} />} />
          <Route path="/kilepes" element={<PrivateRoute element={<Item />} />} />
          <Route path="/dokumentok" element={<PrivateRoute element={<DocList />} />} />
          <Route path="/" element={<PrivateRoute element={<Item />} />} />
          <Route path="/belepes" element={<Login />} />
          <Route path="/regisztracio" element={<PrivateRoute element={<Users />} extraCheck={true} />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default () => (
  <AuthProvider>
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
