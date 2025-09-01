import './App.css';
import User from './components/getcar/Car';
import AddUser from './components/addcar/AddCar';
import UpdateUser from './components/updatecar/UpdateCar';
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
