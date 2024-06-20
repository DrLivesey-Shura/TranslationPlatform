import {
  Box,
  Button,
  Heading,
  Icon,
  Img,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
// import "../index.css";
import { HiArrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const navigate = useNavigate();
  const handleConnect = () => {
    if (user) {
      navigate('/user/dashboards');
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="row"
      justifyContent="center"
      background="#ffffff"
    >
      <Box mt={'15%'} ml={'5%'} w={'60%'}>
        <Heading fontSize={35}>
          Translation services with a social mission
        </Heading>
        <Text fontSize={24} mt={'5%'} ml={'5%'}>
          Say goodbye to language barriers, and let toula be your trusted
          partner in the world of translation.
        </Text>
        <Button
          onClick={handleConnect}
          type="submit"
          mt={'5%'}
          ml={'25%'}
          colorScheme="messenger"
        >
          Get started <Icon as={HiArrowRight} fontSize="20px" ml={2} />
        </Button>
      </Box>
      <VStack></VStack>
      <VStack w="35%" h="80vh" justifyContent="center" ml={10}>
        <Box mr="50px" boxSize="full" overflow="hidden" position="relative">
          <Img
            src={require('../../assets/img/home/bc3.jpg')}
            alt="Translation"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Header;
