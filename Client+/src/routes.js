import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDashboard, MdHome, MdLock } from 'react-icons/md';

// Admin Imports
import DashboardsDefault from 'views/admin/dashboards';

// Main Imports

import ProfileSettings from 'views/admin/main/profile/settings';

import NewUpload from 'views/admin/main/Uploads/newUpload';
import UploadOverview from 'views/admin/main/Uploads/overviewUpload';
import UploadDetails from 'views/admin/main/Uploads/uploadDetails';

// Others
import OthersError from 'views/admin/main/others/404';

//Users
// import UserNew from 'views/admin/main/users/newUser/index';
// import UsersOverview from 'views/admin/main/users/overview/index';

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
    layout: '/admin',
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
      //   layout: '/admin',
      //   component: <AccountInvoice />,
      // },
      {
        name: 'Uploads',
        path: '/main',
        collapse: true,
        items: [
          {
            name: 'New Upload',
            layout: '/admin',
            path: '/upload/new-upload',
            exact: false,
            component: <NewUpload />,
          },
          {
            name: 'My Uploads',
            layout: '/admin',
            path: '/upload/my-uploads',
            exact: false,
            component: <UploadOverview />,
          },
          {
            name: 'Upload Details',
            layout: '/admin',
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
      //       layout: '/admin',
      //       path: '/main/users/new-user',
      //       exact: false,
      //       component: <UserNew />,
      //     },
      //     {
      //       name: 'Users Overview',
      //       layout: '/admin',
      //       path: '/main/users/users-overview',
      //       exact: false,
      //       component: <UsersOverview />,
      //     },
      //   ],
      // },

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
            layout: '/admin',
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
