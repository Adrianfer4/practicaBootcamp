import './App.css';
import User from './components/getuser/User';
import AddUser from './components/adduser/AddUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <User />
    },
    {
      path: '/add',
      element: <AddUser />
    }
  ]);

  return (
    <div className='App'>
      <header className='App-header'>
        <RouterProvider router={route} />
      </header>
    </div>
  );
}

export default App;
