import { createContext } from "react";

const AuthContext = createContext({
    // fullname:"admin",
    // password:"888888",
    // role:"admin",
});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});
//     return (
//         <AuthContext.Provider value={[auth,setAuth]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

export default AuthContext;