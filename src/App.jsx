import './App.css'
import { createBrowserRouter,RouterProvider} from "react-router-dom";

import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard'
import Create from './Pages/Property/Create/Create';
import Home from './Pages/Home/Home';
import Listings from './Pages/Listings/Listings';
import Register from './Pages/Agents/Register/Register';
import UpdatePassword from './Pages/Agents/UpdatePassword/UpdatePassword';
import UpdateProfile from './Pages/Agents/UpdateProfile/UpdateProfile';
import Agents from './Pages/Agents/Agents/Agents';
import Sellers from './Pages/Sellers/Sellers';
import Buyers from './Pages/Buyers/Buyers';
import AgentProfile from './Pages/Agents/AgentProfile/AgentProfile';
import UpdateProperty from './Pages/Property/Update/UpdateProperty';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path:"/dashboard",
    element:<Dashboard/>,
    children:[
      {
        path:'/dashboard',
        element:<Home/>
      },
      {
        path:'/dashboard/create',
        element:<Create/>
      },
      {
        path:'/dashboard/update/:id',
        element:<UpdateProperty/>
      },
      {
        path:'/dashboard/properties',
        element:<Listings/>
      },
      {
        path:'/dashboard/register',
        element:<Register/>
      },
      {
        path:'/dashboard/update-profile',
        element:<UpdateProfile/>
      },
      {
        path:'/dashboard/change-password',
        element:<UpdatePassword/>
      },
      {
        path:'/dashboard/sellers',
        element:<Sellers/>
      },
      {
        path:'/dashboard/Agent/:id',
        element:<AgentProfile/>
      },
      {
        path:'/dashboard/Agents',
        element:<Agents/>
      },
      {
        path:'/dashboard/buyers',
        element:<Buyers/>
      }
    ]
  },
]);

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
