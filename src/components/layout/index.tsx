import { Flex, HStack, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Sidebar } from "..";
import { useCountries } from "../../context";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { collapse, setCollapse } = useCountries();

  return (
    <HStack w="full" h="100vh" bg="gray.100" padding={10}>
      <Flex
        as="aside"
        w="full"
        h="full"
        maxW={collapse ? 350 : 100}
        bg="white"
        alignItems="start"
        padding={6}
        flexDirection="column"
        justifyContent="space-between"
        transition="ease-in-out .2s"
        borderRadius="3xl"
      >
        <Sidebar />
      </Flex>
      <Flex
        as="main"
        w="full"
        h="full"
        bg="white"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
      >
        <IconButton
          aria-label="Menu Colapse"
          icon={<HamburgerIcon />}
          position="absolute"
          top={6}
          left={6}
          onClick={() => setCollapse(!collapse)}
        />

        {children}
      </Flex>
    </HStack>
  );
};

export default Layout;
