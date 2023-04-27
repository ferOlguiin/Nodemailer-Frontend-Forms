import axios from "axios";

export const loginUserRequest = async (fields) => await axios.post("https://nodemailer-bcrypt-production.up.railway.app/login", fields);

export const registerUserRequest = async (newFields) => await axios.post("https://nodemailer-bcrypt-production.up.railway.app/createuser", newFields);