import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDashboard, MdHome, MdLock } from 'react-icons/md';

// user Imports
import DashboardsDefault from 'views/user/dashboards';

// admin Imports
import AdminDashboard from 'views/admin/dashboards';
import UserNew from 'views/admin/main/users/newUser/index';
import UsersOverview from 'views/admin/main/users/overview/index';
import EmployeesOverview from 'views/admin/main/users/empOverview/index';
import Demmands from 'views/admin/main/Uploads/Demands';

// Main Imports

import ProfileSettings from 'views/user/main/profile/settings';

import NewUpload from 'views/user/main/Uploads/newUpload';
import UploadOverview from 'views/user/main/Uploads/overviewUpload';
import UploadDetails from 'views/user/main/Uploads/uploadDetails';

// Others
import OthersError from 'views/user/main/others/404';

// Auth Imports
import ForgotPasswordDefault from 'views/auth/forgotPassword/ForgotPasswordDefault.jsx';
import SignInCentered from 'views/auth/signIn/SignInCentered.jsx';
import SignUpCentered from 'views/auth/signUp/SignUpCentered.jsx';
import VerificationDefault from 'views/auth/verification/VerificationDefault.jsx';
import Home from 'views/home/index';
import AboutUs from 'views/home/aboutUs';
import Features from 'views/home/Features';

let routes = [
  {
    name: 'Authentication',
    path: '/auth',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      // --- Sign In ---
      {
        name: 'Sign In',
        path: '/sign-in',
        layout: '/auth',
        component: <SignInCentered />,
      },
      {
        name: 'Home',
        path: '/home',
        layout: '/auth',
        component: <Home />,
      },
      {
        name: 'About Us',
        path: '/about-us',
        layout: '/auth',
        component: <AboutUs />,
      },
      {
        name: 'Features',
        path: '/features',
        layout: '/auth',
        component: <Features />,
      },
      // --- Sign Up ---
      {
        name: 'Sign Up',
        path: '/sign-up',
        layout: '/auth',
        component: <SignUpCentered />,
      },
      // --- Verification ---
      {
        name: 'Verification',
        path: '/verification',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/verification',
            component: <VerificationDefault />,
          },
        ],
      },

      // --- Forgot Password ---
      {
        name: 'Forgot Password',
        path: '/forgot-password',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/forgot-password',
            component: <ForgotPasswordDefault />,
          },
        ],
      },
    ],
  },
];

try {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (user) {
    if (user.isAdmin) {
      routes = routes = routes.concat([
        // --- Dashboards ---
        {
          name: 'Admin Dashboard',
          path: '/dashboards',
          icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
          layout: '/admin',
          component: <AdminDashboard user={user} />,
        },
        // --- Main pages ---
        {
          name: 'Main Pages',
          path: '/admin',
          icon: (
            <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />
          ),
          collapse: true,
          items: [
            {
              name: 'Demmands',
              layout: '/admin',
              path: '/demmands',
              exact: false,
              component: <Demmands />,
            },

            {
              name: 'Upload Details',
              layout: '/admin',
              path: '/upload/upload-details/:currentTranslationId',
              exact: false,
              component: <UploadDetails />,
            },

            {
              name: 'Users',
              path: '/admin/users',
              collapse: true,
              items: [
                {
                  name: 'New Employee',
                  layout: '/admin',
                  path: '/users/new-user',
                  exact: false,
                  component: <UserNew />,
                },
                {
                  name: 'Users Overview',
                  layout: '/admin',
                  path: '/users/users-overview',
                  exact: false,
                  component: <UsersOverview />,
                },
                {
                  name: 'Employees Overview',
                  layout: '/admin',
                  path: '/users/employee-overview',
                  exact: false,
                  component: <EmployeesOverview />,
                },
              ],
            },

            {
              name: 'Profile',
              path: '/profile',
              layout: '/admin',
              component: <ProfileSettings />,
            },
            {
              name: 'Others',
              path: '/main/others',
              collapse: true,
              items: [
                {
                  name: '404',
                  layout: '/user',
                  path: '/main/others/404',
                  exact: false,
                  component: <OthersError />,
                },
              ],
            },
          ],
        },
      ]);
    } else {
      routes = routes.concat([
        // --- Dashboards ---
        {
          name: 'Dashboards',
          path: '/dashboards',
          icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
          layout: '/user',
          component: <DashboardsDefault user={user} />,
        },
        // // --- Main pages ---
        {
          name: 'Main Pages',
          path: '/user',
          icon: (
            <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />
          ),
          collapse: true,
          items: [
            // {
            //   name: 'Account',
            //   path: '/main/account',
            //   layout: '/user',
            //   component: <AccountInvoice />,
            // },

            {
              name: 'New Upload',
              layout: '/user',
              path: '/upload/new-upload',
              exact: false,
              component: <NewUpload />,
            },
            {
              name: 'My Uploads',
              layout: '/user',
              path: '/upload/my-uploads',
              exact: false,
              component: <UploadOverview />,
            },
            {
              name: 'Upload Details',
              layout: '/user',
              path: '/upload/upload-details/:currentTranslationId',
              exact: false,
              component: <UploadDetails />,
            },

            // {
            //   name: 'Users',
            //   path: '/main/users',
            //   collapse: true,
            //   items: [
            //     {
            //       name: 'New User',
            //       layout: '/user',
            //       path: '/main/users/new-user',
            //       exact: false,
            //       component: <UserNew />,
            //     },
            //     {
            //       name: 'Users Overview',
            //       layout: '/user',
            //       path: '/main/users/users-overview',
            //       exact: false,
            //       component: <UsersOverview />,
            //     },
            //   ],
            // },

            {
              name: 'Profile',
              path: '/profile',
              layout: '/user',
              component: <ProfileSettings />,
            },
            {
              name: 'Others',
              path: '/main/others',
              collapse: true,
              items: [
                {
                  name: '404',
                  layout: '/user',
                  path: '/main/others/404',
                  exact: false,
                  component: <OthersError />,
                },
              ],
            },
          ],
        },
      ]);
    }
  }
} catch (error) {
  console.error('Error parsing user information from localStorage:', error);
}
export default routes;
