'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

type Props = {
    children: React.ReactNode;
}
const client = new QueryClient();

const ReactQueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;