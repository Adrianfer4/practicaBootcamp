import './App.css';
import User from './components/getuser/User';
import AddUser from './components/adduser/AddUser';
import UpdateUser from './components/updateuser/UpdateUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <User />
    },
    {
      path: '/add',
      element: <AddUser />
    },
    {
      path: '/update/:id',
      element: <UpdateUser />
    }
  ]);

  return (
    <div className='App'>
      <header className='App-header'>
        <RouterProvider router={route} />
      </header>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
