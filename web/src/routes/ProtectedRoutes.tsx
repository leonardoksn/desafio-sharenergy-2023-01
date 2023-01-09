import { Route, Routes } from 'react-router-dom'
import { CatPage } from '../pages/CatPage'
import { DogPage } from '../pages/DogPage'

export const ProtectedRoutes = () => {
    return (
        <>
            <Route path='/cat' element={<CatPage />} />
            <Route path='/dog' element={<DogPage />} />
        </>
    )
}
