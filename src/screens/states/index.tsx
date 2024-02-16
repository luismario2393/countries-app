import { Spinner, useDisclosure } from "@chakra-ui/react";
import { Layout, Table, Modal } from "../../components";
import { useCountries } from "../../context";

const States = () => {
  const { states, state, loading, fetchState } = useCountries();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table data={states} onOpen={onOpen} fetchState={fetchState} />
          <Modal isOpen={isOpen} onClose={onClose} data={state} />
        </>
      )}
    </Layout>
  );
};

export default States;
