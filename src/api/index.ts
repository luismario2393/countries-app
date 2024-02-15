import axios from "axios";

const APIKEY = "cmRDSU1RVDYzdTY4TGxzYmVQbkVWdDRKUTRpcEZIODRMb2UxWjJFaA==";

const config = {
  method: "get",
  url: "https://api.countrystatecity.in/v1/countries",
  headers: {
    "X-CSCAPI-KEY": APIKEY,
  },
};

export const getCountries = async () => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
