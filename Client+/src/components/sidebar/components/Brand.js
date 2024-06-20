// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
// import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand(props) {
  const { mini, hovered } = props;
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="row">
      <Box display={mini ? (hovered ? 'block' : 'none') : 'block'} mr={2}>
        <Avatar
          src={require('../../../assets/img/home/logo.jpg')}
          h="56px"
          w="75px"
          color={logoColor}
          alt="Logo"
        />
      </Box>
      <Text
        fontSize="20px"
        h="26px"
        w="200px"
        my="22px"
        color={logoColor}
        display={mini ? (hovered ? 'block' : 'none') : 'block'}
      >
        Translation Services
      </Text>
      <Text
        display={!mini || (mini && hovered) ? 'none' : 'block'}
        fontSize="30px"
        fontWeight="800"
        color={logoColor}
        ml={2}
      >
        H
      </Text>
    </Flex>
  );
}

export default SidebarBrand;
