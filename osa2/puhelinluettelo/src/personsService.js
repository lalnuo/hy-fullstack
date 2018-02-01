import axios from "axios";

export const fetchPersons = () => axios.get("/api/persons");
export const addPerson = data => axios.post("/api/persons", data);

export const removePerson = id => axios.delete("/api/persons/" + id);

export const updatePerson = (id, data) => axios.put("/api/persons/" + id, data);
