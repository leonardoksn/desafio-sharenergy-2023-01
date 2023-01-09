import { createContext, useContext, useMemo, useState } from "react";
import { fakeAuthProvider } from "../ultis/auth";

interface AuthContextType {
    token: string | null;
    signin: (user: IUser, callback: (isAuth: boolean) => void) => void;
    signout: (callback: VoidFunction) => void;
    isAuth: boolean
}

let AuthContext = createContext<AuthContextType>(null!);

interface IUser {
    username: string,
    password: string,
    remember: boolean
}
import Cookies from 'js-cookie';
import { api } from "../resource/api";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        const tokenSession = Cookies.get('@desafiosharenergy:token')
        return tokenSession || null
    });
    const isAuth = useMemo(() => !!token, [token])

    const signin = ({ username, password, remember }: IUser, callback: (isAuth: boolean) => void) => {
        fakeAuthProvider.signin({ usercode: username, password }, ({ err, result }: { err: any | null, result: string | null }) => {
            if (result) {

                Cookies.set('@desafiosharenergy:token', result, { expires: remember ? 30 : 2 / 24 });
            }
            setToken(result);
        })
            .then(() => callback(isAuth))
    };

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setToken(null);
            Cookies.remove('@desafiosharenergy:token');
            callback();
        });
    };

    let value = { token, signin, signout, isAuth };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }