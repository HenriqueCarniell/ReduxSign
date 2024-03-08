import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormLogin from './components/formlogin/formLogin';
import FormCreateAccount from './components/formCreateAccount/formCreateAccount';
import Home from './components/home/home';
import { Provider, useSelector } from 'react-redux';
import store from './components/redux/store';

const App = () => {
  const {currentUser} = useSelector((state: { userReducer: any}) => state.userReducer);
  console.log(currentUser);
  return (
    
    <BrowserRouter>
            {currentUser ? <Home/> : <FormLogin/> }
      <Routes>
        <Route path='/createaccount' element={<FormCreateAccount/>} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
