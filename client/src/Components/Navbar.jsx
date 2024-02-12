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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import Sidebar from "./Sidebar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Links = ["Dashboard", "My Uploads", "Contact Us"];

const Navbar = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

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
            {Links.map((link) => (
              <NavLink
                color={useColorModeValue("black", "#ffffffcc")}
                links={link}
                key={link}
              />
            ))}
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
              <MenuItem>Profile</MenuItem>
              <MenuItem></MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <HStack as={"nav"} spacing={4} flexDirection="column">
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
