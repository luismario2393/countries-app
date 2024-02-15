import { Avatar as AvatarChakra, Flex, Text } from "@chakra-ui/react";
import { useCountries } from "../../context";

export const Avatar = () => {
  const { collapse } = useCountries();
  return (
    <Flex
      borderWidth={collapse ? 1 : 0}
      borderColor="gray.100"
      borderRadius="full"
      w="full"
      p={2}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flexDirection={collapse ? "row" : "column-reverse"}
    >
      <AvatarChakra name="Luis Mario" bg="teal.300" />
      {collapse && (
        <Flex
          w="full"
          flexDirection="column"
          gap={4}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Text fontSize="sm" fontWeight="bold" pb="0" lineHeight={0}>
            Luis Mario Sánchez
          </Text>
          <Text as="small" color="gray.500" fontSize={12} lineHeight={0}>
            luismarioamorsanchez@gmail.com
          </Text>
        </Flex>
      )}
    </Flex>
  );
};
