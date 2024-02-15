import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { BiWorld } from "react-icons/bi";
import { useCountries } from "../../context";

export const Logo = () => {
  const { collapse } = useCountries();
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={collapse ? "row" : "column"}
      gap={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Icon as={BiWorld} fontSize={18} color={"teal.300"} />
        {collapse && (
          <Text fontWeight="bold" fontSize={16} color="gray.300">
            CountriesApp
          </Text>
        )}
      </Box>
    </Flex>
  );
};
