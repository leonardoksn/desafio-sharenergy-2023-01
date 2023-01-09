
import { AuthProvider } from './context/auth'
import { RouteIndex } from './routes/index.route'
import QueryProvider from './context/query'
import './global.style.css'

export const App = () => {
    return (
        <QueryProvider>
            <AuthProvider>
                <RouteIndex />
            </AuthProvider>
        </QueryProvider>
    )
}
