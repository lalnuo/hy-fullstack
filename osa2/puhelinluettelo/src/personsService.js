import axios from "axios";

export const fetchPersons = () => axios.get("http://localhost:3001/persons");
export const addPerson = data =>
  axios.post("http://localhost:3001/persons", data);

export const removePerson = id =>
  axios.delete("http://localhost:3001/persons/" + id);

export const updatePerson = (id, data) =>
  axios.put("http://localhost:3001/persons/" + id, data);
