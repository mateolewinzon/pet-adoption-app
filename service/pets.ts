import { get, post } from "./privateApi";

export const getPets = async () => {
  const data = await get("pets");
  return data;
};

export const getAnimals = async () => {
  const data = await get("animals");
  return data;
};

export const getBreeds = async () => {
  const data = await get("breeds");
  return data;
};

export const postPet = async (body: {}) => {
  try {
    
  } catch (error) {
    
  }
  const data = await post("pets", body);
  return data;
};
