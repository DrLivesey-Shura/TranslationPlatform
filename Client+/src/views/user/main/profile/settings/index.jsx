// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
// Assets
import banner from 'assets/img/auth/banner.png';
import profile from 'assets/img/crm/vbz.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Custom components
import Info from 'views/user/main/profile/settings/components/Info';
import Password from 'views/user/main/profile/settings/components/Password';
import Profile from 'views/user/main/profile/settings/components/Profile';
import Socials from 'views/user/main/profile/settings/components/Socials';

const user = JSON.parse(localStorage.getItem('userInfo'));

export default function Settings() {
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Profile user={user} />
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        {/* Column Left */}
        <Flex direction="column">
          <Info user={user} />
        </Flex>
        {/* Column Right */}
        <Flex direction="column">
          <Password user={user} />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
