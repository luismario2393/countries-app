import { Box } from "@chakra-ui/react";
import { Logo, Avatar, Navigation } from "..";

export const Sidebar = () => {
  return (
    <>
      <Box w="full">
        <Logo />
        <Navigation />
      </Box>
      <Avatar />
    </>
  );
};
