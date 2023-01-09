import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import React from 'react'


export default function App({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
