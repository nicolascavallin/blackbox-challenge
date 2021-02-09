import React, { useContext } from 'react'
import { Heading, Image } from '@chakra-ui/react'
import LayoutFullscreen from '../../layout/LayoutFullscreen'
import Button from '../../ui/Button'
import AppContext from '../../context'

const WelcomeScreen: React.FC = () => {

    const { actions: { onNextStep } } = useContext( AppContext )

    return(
        <LayoutFullscreen>

            <Heading my={ 3 } color='gray.600' className='animate__animated animate__bounceInLeft' >Hey there!</Heading>
            
            <Heading my={ 3 } color='blue.500' className='animate__animated animate__bounceInRight' >Are you ready for play?!</Heading>

            <Image maxW={ 400 } src='./illustration_1.png' className='animate__animated animate__fadeIn' />

            <Button buttonProps={{ onClick: () => onNextStep(), my: 6, className: 'animate__animated animate__fadeInUp' }}  >Let's go!</Button>
            
        </LayoutFullscreen>
    )
}

export default WelcomeScreen