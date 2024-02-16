import axios from "axios";

const API_KEY = "cmRDSU1RVDYzdTY4TGxzYmVQbkVWdDRKUTRpcEZIODRMb2UxWjJFaA==";
const URL = "https://api.countrystatecity.in/v1";

const config = {
  method: "get",
  headers: {
    "X-CSCAPI-KEY": API_KEY,
  },
};

export const getCountries = async () => {
  try {
    const response = await axios({
      url: `${URL}/countries`,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCountry = async (iso2: string) => {
  try {
    const response = await axios({
      url: `${URL}/countries/${iso2}`,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getStates = async () => {
  try {
    const response = await axios({
      url: `${URL}/states`,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getState = async (countryCode: string, iso2: string) => {
  try {
    const response = await axios({
      url: `${URL}/countries/${countryCode}/states/${iso2}`,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
