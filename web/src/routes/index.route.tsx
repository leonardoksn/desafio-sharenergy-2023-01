import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { CatPage } from '../pages/CatPage'
import { Crud } from '../pages/Crud'
import { DogPage } from '../pages/DogPage'
import { Layout } from '../components/Layout'
import { LoginPage } from '../pages/LoginPage'
import { ClientList } from '../pages/ClientList'
import { RequireAuth } from './RequireAuth'

export const RouteIndex = () => {
    const { isAuth } = useAuth()
    return (
        <Routes>
            {
                isAuth ?
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Layout />
                            </RequireAuth>
                        }
                    >

                        <Route path='/cat' element={<CatPage />} />
                        <Route path='/users' element={<ClientList />} />
                        <Route path='/dog' element={<DogPage />} />
                        <Route path='/crud' element={<Crud />} />
                        <Route path='*' element={<Navigate to="/users" />} />



                    </Route>
                    :

                    <Route path='/login' element={<LoginPage />} />



            }
            {!isAuth && <Route path='*' element={<Navigate to="/login" />} />
            }


        </Routes>
    )
}
