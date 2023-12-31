import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import ProjectCreation from './pages/ProjectCreation';
import StartUpRedirect from './pages/StartUpRedirect'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserContextProvider } from './contexts/userContextProvider';

// Define some sample data for testing
const sampleProjects = [
  {
    name: "Project A",
    users: ["Alice", "Bob", "Charlie"],
    hwsets: [
      {
        name: "HWSet 1",
        quantity: 10,
      },
      {
        name: "HWSet 2",
        quantity: 5,
      }
    ]
  },
  {
    name: "Project B",
    users: ["David", "Eve", "Frank"],
    hwsets: [
      {
        name: "HWSet 3",
        quantity: 8,
      },
      {
        name: "HWSet 4",
        quantity: 6,
      }
    ]
  }
];

const router = createBrowserRouter([
{
  path: '/',
  element: <StartUpRedirect />,
},
{
  path: '/login',
  element: <Login />,
},
{
  path: "/signup",
  element: <Signup />

},

{
  path: "/projects",
  element: <Projects projects = {sampleProjects}/>

},
{
  path: "/projectcreation",
  element: <ProjectCreation />
}

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);


reportWebVitals();
