import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Spacer,
  Tag,
  chakra,
  Icon,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');

  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/user/dashboards');
  };
  const handleSignIn = () => {
    navigate('/auth/sign-in');
  };
  const handleSignUp = () => {
    navigate('/auth/sign-up');
  };
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/auth/home');
  };

  const handleMyUploadClick = () => {
    navigate('/user/upload/my-uploads');
  };

  const handleProfileClick = () => {
    navigate('/user/profile');
  };

  return (
    <Box>
      <Box bgGradient="linear(to-l,  #EBF8FF,#EBF8FF)">
        <Flex as="nav" alignItems="center" position="relative">
          <Flex>
            <Tag
              bg="none"
              size="lg"
              borderRadius="full"
              m={3}
              h={'50px'}
              mr={'25%'}
              w={'420px'}
            >
              <Avatar
                src={require('../../assets/img/home/logo.jpg')}
                size="lg"
                name="Segun Adebayo"
                ml={-1}
                mr={2}
              />
              <chakra.h2
                bgClip="text"
                fontSize="2xl"
                bgGradient="linear(to-l,  #3182CE,#F6AD55)"
                fontWeight="medium"
                cursor="pointer"
              >
                Translation services
              </chakra.h2>
            </Tag>
          </Flex>
          <Spacer />

          <Link
            to="/auth/home"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              marginRight: '32px',
              color: 'black',
              size: '50px',
              fontSize: '20px',
            }}
          >
            <Icon as={FaHome} fontSize="30px" mr={2} />
            Home
          </Link>

          <Link
            to="/auth/about-us"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              marginRight: '32px',
              color: 'black',
              size: '100px',
              fontSize: '20px',
            }}
          >
            <Icon as={FaInfoCircle} fontSize="30px" mr={2} />
            About us
          </Link>
          <Link
            to="/auth/features"
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '32px',
              marginBottom: '10px',
              color: 'black',
              size: '100px',
              fontSize: '20px',
            }}
          >
            <Icon as={FaTasks} fontSize="30px" mr={2} />
            Features
          </Link>

          <HStack spacing="20px">
            {user ? (
              <>
                <Flex>
                  <Menu>
                    <MenuButton mr="20px" p="0px">
                      <Avatar
                        _hover={{ cursor: 'pointer' }}
                        color="white"
                        name={user.username}
                        bg="#11047A"
                        size="md"
                        w="50px"
                        h="50px"
                      />
                    </MenuButton>
                    <MenuList
                      boxShadow={shadow}
                      p="0px"
                      mt="10px"
                      borderRadius="20px"
                      bg={menuBg}
                      border="none"
                    >
                      <Flex w="100%" mb="0px">
                        <Text
                          ps="20px"
                          pt="16px"
                          pb="10px"
                          w="100%"
                          borderBottom="1px solid"
                          borderColor={borderColor}
                          fontSize="sm"
                          fontWeight="700"
                          color={textColor}
                        >
                          👋&nbsp; Hey, {user.username}
                        </Text>
                      </Flex>
                      <Flex flexDirection="column" p="10px">
                        <MenuItem
                          _hover={{ bg: 'none' }}
                          _focus={{ bg: 'none' }}
                          borderRadius="8px"
                          px="14px"
                          onClick={handleDashboard}
                        >
                          <Text fontSize="sm">Dashboard</Text>
                        </MenuItem>
                        <MenuItem
                          _hover={{ bg: 'none' }}
                          _focus={{ bg: 'none' }}
                          borderRadius="8px"
                          px="14px"
                          onClick={handleProfileClick}
                        >
                          <Text fontSize="sm">Profile</Text>
                        </MenuItem>
                        <MenuItem
                          _hover={{ bg: 'none' }}
                          _focus={{ bg: 'none' }}
                          borderRadius="8px"
                          px="14px"
                          onClick={handleMyUploadClick}
                        >
                          <Text fontSize="sm">My Uploads</Text>
                        </MenuItem>
                        <MenuItem
                          _hover={{ bg: 'none' }}
                          _focus={{ bg: 'none' }}
                          color="red.400"
                          borderRadius="8px"
                          px="14px"
                          onClick={handleLogout}
                        >
                          <Text fontSize="sm">Log out</Text>
                        </MenuItem>
                      </Flex>
                    </MenuList>
                  </Menu>
                </Flex>
              </>
            ) : (
              <>
                <Flex>
                  <Button onClick={handleSignIn} type="submit">
                    Sign in
                  </Button>
                </Flex>
                <Spacer />
                <Flex>
                  <Button
                    variant="brand"
                    onClick={handleSignUp}
                    mr={10}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Flex>
              </>
            )}
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
