import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fakeAuthProvider } from "../ultis/auth";

interface AuthContextType {
    token: string | null;
    signin: (user: IUser, callback: (isAuth: boolean) => void) => void;
    signout: (callback: VoidFunction) => void;
    isAuth: boolean | undefined;
}

let AuthContext = createContext<AuthContextType>(null!);

interface IUser {
    username: string,
    password: string,
    remember: boolean
}
import Cookies from 'js-cookie';
import { api } from "../resource/api";
const validateToken = async (token: string | null) => {
    if (token === null) {
        throw false
    }
    return await api.post('/auth/token', { token })
        .then(res => res.data)
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        const tokenSession = Cookies.get('@desafiosharenergy:token')

        return tokenSession || null
    });
    const [isAuth, setIsAuth] = useState<undefined | boolean>()

    useEffect(() => {
        validateToken(Cookies.get('@desafiosharenergy:token') || null)
            .then((res) => {
                console.log(res)
                setIsAuth(() => true)
            })
            .catch((err) => {
                Cookies.remove('@desafiosharenergy:token');
                setIsAuth(() => false)
            }
            )
    }, [token])

    // const isAuth = useMemo(() => !!token, [token])

    const signin = async ({ username, password, remember }: IUser, callback: (isAuth: boolean) => void) => {

        const [err, result] = await api.post('/collaborator/auth/login', { usercode: username, password })
            .then(res => [null, res?.data?.token || null])
            .catch((err) => [err, null])

        if (err) {
            console.log(err)
            return callback(false)
        }
        Cookies.set('@desafiosharenergy:token', result, { expires: remember ? 30 : 2 / 24 });

        setToken(result)
        setIsAuth(true)

        return callback(true)
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