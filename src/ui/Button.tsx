import React from 'react'
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'

interface Props {
    buttonProps?: ButtonProps
}

const Button: React.FC<Props> = ({ children, buttonProps }) => {

    return (
        <ChakraButton
            size='lg'
            colorScheme='blue'
            { ...buttonProps }
        >
            { children }
        </ChakraButton>
    )

}

export default Button