import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const NavLink = ({ color, links }) => {
  return (
    <Box
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
      _active={{ textDecoration: "underline", color: "red" }}
      color={color}
      href={"#"}
    >
      {links}
    </Box>
  );
};

export default NavLink;
