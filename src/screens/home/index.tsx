import { Spinner, useDisclosure } from "@chakra-ui/react";
import { Layout, Table, Modal } from "../../components";
import { useCountries } from "../../context";

const Home = () => {
  const { countries, loading, fetchCountry, country } = useCountries();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <>
          <Table data={countries} onOpen={onOpen} fetchCountry={fetchCountry} />
          <Modal isOpen={isOpen} onClose={onClose} data={country} />
        </>
      )}
    </Layout>
  );
};

export default Home;
