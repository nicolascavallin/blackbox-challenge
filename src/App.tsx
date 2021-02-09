import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { AppProvider } from './context'

interface Props {
    
}

const App = (props: Props) => {
    return (
        <ChakraProvider>
            <AppProvider />
        </ChakraProvider>
    )
}

export default App
