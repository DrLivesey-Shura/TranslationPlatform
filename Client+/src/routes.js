import React from 'react';

import { Icon } from '@chakra-ui/react';
import { MdDashboard, MdHome, MdLock } from 'react-icons/md';

// Admin Imports
import DashboardsDefault from 'views/admin/dashboards';

// Main Imports

import ProfileSettings from 'views/admin/main/profile/settings';

import EcommerceNewProduct from 'views/admin/main/ecommerce/newProduct';
import EcommerceProductOverview from 'views/admin/main/ecommerce/overviewProduct';
import EcommerceOrderDetails from 'views/admin/main/ecommerce/orderDetails';

// Others
import OthersError from 'views/admin/main/others/404';

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
            component: <EcommerceNewProduct />,
          },
          {
            name: 'My Uploads',
            layout: '/admin',
            path: '/upload/my-uploads',
            exact: false,
            component: <EcommerceProductOverview />,
          },
          // {
          //   name: 'Order List',
          //   layout: '/admin',
          //   path: '/main/ecommerce/order-list',
          //   exact: false,
          //   component: <EcommerceOrderList />,
          // },
          {
            name: 'Upload Details',
            layout: '/admin',
            path: '/upload/upload-details/:currentTranslationId',
            exact: false,
            component: <EcommerceOrderDetails />,
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
            path: '/verification/default',
            component: <VerificationDefault />,
          },
        ],
      },
      // --- Lock ---
      {
        name: 'Lock',
        path: '/lock',
        collapse: true,
        items: [
          {
            name: 'Default',
            layout: '/auth',
            path: '/lock/default',
            component: <LockDefault />,
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
            path: '/forgot-password/default',
            component: <ForgotPasswordDefault />,
          },
        ],
      },
    ],
  },
];

export default routes;
