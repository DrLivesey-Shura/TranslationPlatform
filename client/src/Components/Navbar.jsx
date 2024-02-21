// Navbar.jsx
import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import Sidebar from "./Sidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const Links = ["My Uploads", "My Requests", "Contact Us"];

const Navbar = ({ user, onNavLinkClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <Box bg={useColorModeValue("#ffffffcc", "gray.900")} w="100vw" px="8px">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Sidebar />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {/* {Links.map((link) => (
              <NavLink
                color={useColorModeValue("black", "#ffffffcc")}
                links={link}
                key={link}
              />
            ))} */}
            <Button
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "underline",
                textDecorationColor: "gray.700",
                transition: "0.5s",
              }}
              _focus={{ outline: "none", boxShadow: "outline" }}
              _active={{ textDecoration: "underline", color: "cyan" }}
              onClick={() => onNavLinkClick("home")}
            >
              Dashboard
            </Button>
            <Button
              as="a"
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "underline",
                textDecorationColor: "gray.700",
                transition: "0.5s",
              }}
              _focus={{ outline: "none", boxShadow: "outline" }}
              _active={{ textDecoration: "underline", color: "cyan" }}
              onClick={() => onNavLinkClick("requests")}
            >
              My Requests
            </Button>
          </HStack>
          <Button
            _hover={{ bgColor: "none" }}
            _focus={{ bgColor: "none" }}
            bg="none"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            <Box
              color={useColorModeValue("black", "#FFFFFFEB")}
              display="flex"
              alignItems="center"
              mx="12px"
            >
              Hello {user.name}
              <MenuButton
                mx="12px"
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"md"} src={user.pic} />
              </MenuButton>
            </Box>

            <MenuList color={useColorModeValue("black", "white")}>
              <MenuItem>
                <Link>
                  <Profile user={user} />
                </Link>
              </MenuItem>
              <MenuItem></MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
