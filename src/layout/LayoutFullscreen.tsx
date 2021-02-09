import { Box } from '@chakra-ui/react'
import React from 'react'

const LayoutFullscreen: React.FC = ({ children }) => {

    return(
        <Box
            h='100vh'
            w='100vw'
            d='flex'
            justifyContent='center'
        >
            <Box 
                h='100%'
                w='100%'
                maxW='3xl'
                d='flex'
                flexDir='column'
                alignItems='center'
                justifyContent='flex-start'     
                p={ [4,4,12] }
            >
                { children }
            </Box>
        </Box>
    )
}

export default LayoutFullscreen