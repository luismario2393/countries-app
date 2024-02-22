import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { FormControlComponent, Layout } from "../../components";
import { Field, Form, Formik } from "formik";
import { VscQuestion } from "react-icons/vsc";

const CreateGroup = () => {
  const validate = (value) => {
    let error;
    if (!value) {
      error = "Field is required";
    }
    return error;
  };

  return (
    <Layout>
      <Box
        width={"100%"}
        maxWidth={760}
        border={"1px solid #e2e8f0"}
        borderRadius={10}
      >
        <Flex
          gap={2}
          alignItems={"center"}
          borderBottom={"2px solid #e2e8f0"}
          padding={6}
        >
          <Text
            variant={"h2"}
            fontWeight={700}
            color={"#596079"}
            fontSize={17.5}
          >
            Basic Information
          </Text>
          <VscQuestion size={20} color={"teal"} />
        </Flex>
        <Formik
          initialValues={{ name: "", time_zone: "", group_affiliate: "" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => {
            return (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "20px",
                }}
              >
                <Field name="name" validate={validate}>
                  {({ field, form }) => (
                    <FormControlComponent
                      label="Affiliate Network Name"
                      isValidate={form.errors.name && form.touched.name}
                      errorMessages={form.errors.name}
                      subLabel="Give a full name or descriptive to the affiliate network you're registering"
                    >
                      <Input {...field} placeholder="Nombre" />
                    </FormControlComponent>
                  )}
                </Field>

                <Field name="time_zone" validate={validate}>
                  {({ field, form }) => (
                    <FormControlComponent
                      label="Set the timezone"
                      isValidate={
                        form.errors.time_zone && form.touched.time_zone
                      }
                      errorMessages={form.errors.time_zone}
                      subLabel="Set the desired Timezone for the Affiliate Network to
                    perform automated tasks"
                    >
                      <Select {...field} placeholder="Select your time zone">
                        <option>EST Eastern Standard Time GMT-4:00 DST</option>
                      </Select>
                    </FormControlComponent>
                  )}
                </Field>

                <Field name="group_affiliate" validate={validate}>
                  {({ field, form }) => (
                    <FormControlComponent
                      label="Group this Affiliate Network"
                      isValidate={
                        form.errors.group_affiliate &&
                        form.touched.group_affiliate
                      }
                      errorMessages={form.errors.group_affiliate}
                      subLabel="This option allows you to group your newly created
                      Affiliate Network with others that share similar
                      characteristics"
                    >
                      <Select {...field} placeholder="Select your time zone">
                        <option>Weekly</option>
                      </Select>
                    </FormControlComponent>
                  )}
                </Field>

                <Box>
                  <Button
                    mt={4}
                    colorScheme={"blue"}
                    isLoading={props.isSubmitting}
                    type="submit"
                    fontSize={14}
                    padding={"21px 28px"}
                  >
                    Create a new group
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Layout>
  );
};

export default CreateGroup;
