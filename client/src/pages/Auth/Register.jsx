import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "../../assets/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();
  const [adress, setAdress] = useState();
  const [birthDay, setBirthDay] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    if (
      !(name && username && email && adress && phone && birthDay && password)
    ) {
      toast({
        title: "Veuillez remplir vos infornations ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Le mot de passe doit contenir 6 caractères ou moins",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "le mot passe est incompatible",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email address",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = { headers: { "content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/user/",
        { name, username, email, password, adress, phone, birthDay },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Username is already taken",
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } else if (error.response && error.response.status === 408) {
        toast({
          title: "Email is already taken",
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error connecting to the server",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container
      display="flex"
      justifyContent="center"
      width="100%"
      maxW="container.md"
      py={{ base: "12px", md: "24px" }}
      px={{ base: "0", sm: "8px" }}
    >
      <Stack spacing="1">
        <Stack spacing="1">
          <Logo />
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Join us
            </Heading>
            <Text color="fg.muted">
              Already have an account? <Link href="/login">Sign in</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "bg.surface",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <HStack spacing={{ base: "4", md: "8" }} width="800px">
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    type="username"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    type="name"
                  />
                </FormControl>
              </HStack>
              <HStack spacing={{ base: "4", md: "8" }} width="800px">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="birthDay">Date of Birth</FormLabel>
                  <Input
                    onChange={(e) => setBirthDay(e.target.value)}
                    id="birthDay"
                    type="date"
                  />
                </FormControl>
              </HStack>
              <HStack spacing={{ base: "4", md: "8" }} width="800px">
                <FormControl>
                  <FormLabel htmlFor="adress">Location</FormLabel>
                  <Input
                    onChange={(e) => setAdress(e.target.value)}
                    id="adress"
                    type="adress"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="phone">Phone</FormLabel>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    id="phone"
                    type="phone"
                  />
                </FormControl>
              </HStack>
              <HStack spacing={{ base: "4", md: "8" }} width="800px">
                <FormControl spacing="8" width="800px">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                  />
                </FormControl>
                <FormControl spacing="8" width="800px">
                  <FormLabel htmlFor="Confpassword">
                    Confirme Password
                  </FormLabel>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="Confpassword"
                    type="password"
                  />
                </FormControl>
              </HStack>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>accept rules</Checkbox>
            </HStack>
            <Stack spacing="6">
              <Button onClick={onSubmit} color="white" bg="#3142C4">
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
