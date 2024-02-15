import {
  ListIcon,
  Link as LinkChakra,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  isActive: boolean;
  setActiveItem: (index: number) => void;
  index: number;
  collapse: boolean;
}

export const NavItem: FC<Props> = ({
  item,
  isActive,
  setActiveItem,
  index,
  collapse,
}) => {
  const { label, path } = item;

  const { icon, notifications, messages } = item;

  const handleClick = () => {
    setActiveItem(index);
  };

  return (
    <Box display="flex" alignItems="center" my={6} justifyContent="center">
      <LinkChakra
        to={path}
        gap={1}
        as={Link}
        display="flex"
        alignItems="center"
        onClick={handleClick}
        _hover={{ textDecoration: "none", color: "black" }}
        fontWeight="medium"
        color={isActive ? "black" : "gray.400"}
        w="full"
        justifyContent={!collapse ? "center" : ""}
      >
        <ListIcon as={icon} fontSize={22} m="0" />
        {collapse && <Text>{label}</Text>}
      </LinkChakra>
      {collapse && (
        <React.Fragment>
          {notifications && (
            <Badge
              borderRadius="full"
              colorScheme="yellow"
              w={6}
              textAlign="center"
            >
              {notifications}
            </Badge>
          )}
          {messages && (
            <Badge
              borderRadius="full"
              colorScheme="green"
              w={6}
              textAlign="center"
            >
              {messages}
            </Badge>
          )}
        </React.Fragment>
      )}
    </Box>
  );
};
