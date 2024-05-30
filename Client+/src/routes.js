import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDashboard, MdHome, MdLock } from 'react-icons/md';

// user Imports
import DashboardsDefault from 'views/user/dashboards';

// Main Imports

import ProfileSettings from 'views/user/main/profile/settings';

import NewUpload from 'views/user/main/Uploads/newUpload';
import UploadOverview from 'views/user/main/Uploads/overviewUpload';
import UploadDetails from 'views/user/main/Uploads/uploadDetails';

// Others
import OthersError from 'views/user/main/others/404';

//Users
// import UserNew from 'views/user/main/users/newUser/index';
// import UsersOverview from 'views/user/main/users/overview/index';

// Auth Imports
import ForgotPasswordDefault from 'views/auth/forgotPassword/ForgotPasswordDefault.jsx';
import LockDefault from 'views/auth/lock/LockDefault.jsx';
import SignInDefault from 'views/auth/signIn/SignInDefault.jsx';
import SignUpDefault from 'views/auth/signUp/SignUpDefault.jsx';
import VerificationDefault from 'views/auth/verification/VerificationDefault.jsx';
const user = JSON.parse(localStorage.getItem('userInfo'));

const routes = [
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
    path: '/main',
    icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      // {
      //   name: 'Account',
      //   path: '/main/account',
      //   layout: '/user',
      //   component: <AccountInvoice />,
      // },
      {
        name: 'Uploads',
        path: '/main',
        collapse: true,
        items: [
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
        ],
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
  // --- Authentication ---
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
        component: <SignInDefault />,
      },
      // --- Sign Up ---
      {
        name: 'Sign Up',
        path: '/sign-up',
        layout: '/auth',
        component: <SignUpDefault />,
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

export default routes;
