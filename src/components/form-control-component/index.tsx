import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  label: string;
  subLabel?: string;
  children?: React.ReactNode;
  isValidate?: boolean;
  errorMessages?: string;
}

export const FormControlComponent: FC<Props> = ({
  label,
  subLabel,
  children,
  isValidate,
  errorMessages,
}) => {
  return (
    <FormControl isInvalid={isValidate} isRequired>
      <FormLabel color={"#43495c"} margin={0} fontSize={15.5}>
        {label}
      </FormLabel>
      <Text
        variant={"p"}
        color={"#718096"}
        fontSize={13}
        fontWeight={400}
        margin={"0 0 8.75px"}
      >
        {subLabel}
      </Text>

      {children}
      <FormErrorMessage>{errorMessages}</FormErrorMessage>
    </FormControl>
  );
};
