import { Box, Link } from "@chakra-ui/react";
import React, { useState } from "react";

const NavLink = ({ color, links }) => {
  const linksTags = (link) => {
    switch (link) {
      case "My Uploads":
        return "user-dashboard";
      case "My Requests":
        return "my-requests";
      case "Contact Us":
        return "contact";
      default:
        return "";
    }
  };

  return (
    <Link
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
      color={color}
      href={`/${linksTags(links)}`}
    >
      {links}
    </Link>
  );
};

export default NavLink;
