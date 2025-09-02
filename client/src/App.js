import './App.css';
import Car from './components/getcar/Car';
import AddCar from './components/addcar/AddCar';
import UpdateCar from './components/updatecar/UpdateCar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Car />
    },
    {
      path: '/add',
      element: <AddCar />
    },
    {
      path: '/update/:id',
      element: <UpdateCar />
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
