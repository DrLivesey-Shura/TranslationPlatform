import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import CenteredAuth from 'layouts/auth/types/Centered';

// Assets
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import axios from 'axios';

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [level, setLevel] = useState();
  const [birthDay, setBirthDay] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    if (
      !(name && username && email && level && phone && birthDay && password)
    ) {
      toast({
        title: 'Please Provide All Informations ',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password Must be atleast 6 characters length',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Invalid email format',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      const config = { headers: { 'content-type': 'application/json' } };
      const { data } = await axios.post(
        '/user',
        { name, username, email, password, level, phone, birthDay },
        config,
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/user/dashboards');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'Username is already taken',
          status: 'error',
          duration: 5000,
          position: 'bottom',
          isClosable: true,
        });
      } else if (error.response && error.response.status === 408) {
        toast({
          title: 'Email is already taken',
          status: 'error',
          duration: 5000,
          position: 'bottom',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error connecting to the server',
          status: 'error',
          duration: 5000,
          position: 'bottom',
          isClosable: true,
        });
      }
    }
  };

  return (
    <CenteredAuth
      image={'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'}
      cardTop={{ base: '140px', md: '14vh' }}
      cardBottom={{ base: '50px', lg: '100px' }}
    >
      <Flex
        maxW="max-content"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        justifyContent="center"
        px={{ base: '20px', md: '0px' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading
            color={textColor}
            fontSize={{ base: '34px', lg: '36px' }}
            mb="10px"
          >
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <Flex align="center" mb="25px">
            <HSeparator />
          </Flex>
          <FormControl>
            <SimpleGrid
              columns={{ base: '1', md: '2' }}
              gap={{ sm: '10px', md: '26px' }}
            >
              <Flex direction="column">
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Username<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  onChange={(e) => setUsername(e.target.value)}
                  isRequired={true}
                  fontSize="sm"
                  ms={{ base: '0px', md: '4px' }}
                  placeholder="Username"
                  variant="auth"
                  type="text"
                  mb="24px"
                  size="lg"
                />
              </Flex>
              <Flex direction="column">
                <FormLabel
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  color={textColor}
                  mb="8px"
                >
                  Full name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  placeholder="username"
                  onChange={(e) => setName(e.target.value)}
                  mb="24px"
                  size="lg"
                />
              </Flex>
            </SimpleGrid>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              size="lg"
            />

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              BirthDay<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              onChange={(e) => setBirthDay(e.target.value)}
              type="date"
              placeholder="xx/xx/xxxx"
              mb="24px"
              size="lg"
            />

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="+213xxxxxxxx"
              mb="24px"
              size="lg"
            />

            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Level<Text color={brandStars}>*</Text>
            </FormLabel>
            <Select
              isRequired={true}
              variant="auth"
              fontSize="sm"
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Select Level"
              mb="24px"
              size="lg"
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
              <option value="Researcher">Researcher</option>
            </Select>

            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              isRequired={true}
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                onChange={(e) => setPassword(e.target.value)}
                ms={{ base: '0px', md: '4px' }}
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? 'text' : 'password'}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="start">
                <Checkbox
                  id="remember-login"
                  colorScheme="brand"
                  me="10px"
                  mt="3px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  By creating an account means you agree to the{' '}
                  <Link
                    href="https://simmmple.com/terms-of-service"
                    fontWeight="500"
                  >
                    Terms and Conditions,
                  </Link>{' '}
                  and our{' '}
                  <Link
                    href="https://simmmple.com/privacy-policy"
                    fontWeight="500"
                  >
                    Privacy Policy
                  </Link>
                </FormLabel>
              </FormControl>
            </Flex>
            <Button
              variant="brand"
              fontSize="14px"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={onSubmit}
            >
              Create my account
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="sm">
              Already a member?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign in
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </CenteredAuth>
  );
}

export default SignUp;
