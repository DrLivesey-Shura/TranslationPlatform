import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
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
import { Logo } from "../assets/Logo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    if (!(email && password)) {
      toast({
        title: "Veuillez remplir vos infornations ",
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
        "/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast({
        title: "error conect.",
        description: "Cette information est incorrectes.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <Container
      maxW="container.md"
      py={{ base: "12px", md: "24px" }}
      px={{ base: "0", sm: "8px" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account? <Link href="/register">Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                />
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button color="white" onClick={onSubmit} bg="#3142C4">
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
