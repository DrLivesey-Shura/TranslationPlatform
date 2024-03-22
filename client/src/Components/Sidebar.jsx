// Sidebar.jsx
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Icon,
  useColorModeValue,
  Flex,
  Img,
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Logo } from "../assets/Logo";
// import { PP } from "../assets/Logo";
const Sidebar = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        _hover={{ bgColor: "none" }}
        border="none"
        bg="none"
        onClick={onOpen}
      >
        <Logo />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerHeader borderBottomWidth="1px">
            Tou La Translation
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex flexDirection="column" alignItems="center">
              <Img
                zIndex={9999}
                position={"relative"}
                w={55}
                // src={PP}
                alt="Company Logo"
              />
            </Flex>
            <Box display="flex" mb="50px" flexDirection="column">
              <Text mt={20} fontSize={20}>
                Company Informations
              </Text>
              <p>Email : toula-translate@toula.com</p>
              <p>CCP : 12312312312</p>
              <p>Phone : +213774856079</p>
              <p>Fix : 0279098327</p>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
