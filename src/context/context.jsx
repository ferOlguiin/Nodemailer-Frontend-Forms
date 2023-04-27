import { createContext, useContext, useState } from "react";
import { loginUserRequest, registerUserRequest } from "../api/backendConnection";
import { toast } from "react-hot-toast";

const contextApp = createContext();

export const useAppContext = () => {
  const context = useContext(contextApp);
  return context;
};


export const Container = ({children}) => {

    //logica
    const [user, setUser] = useState([]);

    const loginUser = async(fields) => {
      try {
        const res = await loginUserRequest(fields);
        setUser(res.data);
        return res;
      } catch (error) {
        toast.error("Mail o contraseña incorrecta");
        console.log(error)
      }
    };

    const registerUser = async (newFields) => {
      try {
        const res = await registerUserRequest(newFields);
        return res;
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <contextApp.Provider value={{user, setUser, loginUser, registerUser}}>
        {children}
    </contextApp.Provider>
  )
}