// chakra imports
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import SidebarCard from 'components/sidebar/components/SidebarCard';
import avatar4 from 'assets/img/avatars/avatar4.png';

// FUNCTIONS

function SidebarContent(props) {
  const { routes, mini, hovered } = props;
  const textColor = useColorModeValue('navy.700', 'white');
  const user = JSON.parse(localStorage.getItem('userInfo'));

  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
      <Brand mini={mini} hovered={hovered} />
      <Stack direction="column" mb="auto" mt="8px">
        <Box
          ps={
            mini === false
              ? '20px'
              : mini === true && hovered === true
              ? '20px'
              : '16px'
          }
          pe={{ md: '16px', '2xl': '1px' }}
          ms={mini && hovered === false ? '-16px' : 'unset'}
        >
          <Links mini={mini} hovered={hovered} routes={routes} />
        </Box>
      </Stack>

      <Flex mt="50px" mb="66px" justifyContent="center" alignItems="center">
        <Avatar
          h="48px"
          w="48px"
          src={user.pic}
          me={
            mini === false
              ? '20px'
              : mini === true && hovered === true
              ? '20px'
              : '0px'
          }
        />
        <Box
          display={
            mini === false
              ? 'block'
              : mini === true && hovered === true
              ? 'block'
              : 'none'
          }
        >
          <Text color={textColor} fontSize="md" fontWeight="700">
            {user.name}
          </Text>
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="400">
            {user.level}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SidebarContent;
