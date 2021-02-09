import React, { useContext, useEffect, useState } from 'react'
import { Heading, Image } from '@chakra-ui/react'
import Confetti from 'react-dom-confetti'
import LayoutFullscreen from '../../layout/LayoutFullscreen'
import AppContext from '../../context'

const ScoreScreen: React.FC = () => {

    const { state: { answers } } = useContext( AppContext )

    const [ confetti, setConfetti ] = useState( false )
    const [ maxScore, setMaxScore ] = useState( 0 )
    const [ score, setScore ] = useState<Number | null>( null )

    useEffect(() => {

        setTimeout(() => {
            setMaxScore( answers.map( x => ( x.question.type === 'multiple' ) ? Number( 10 ) : Number( 5 ) ).reduce( (a, b) => a + b ) )
            setScore( answers.map( x => ( x.answer === x.question.correct_answer ) ? 1 * ( ( x.question.type === 'multiple' ? 10 : 5 ) ) : 0 ).reduce( (a, b) => a + b ) )
        }, 500);
 
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        
        <LayoutFullscreen>

            <Confetti active={ (confetti) } ref={ () => setConfetti( true ) } config={{
                    angle: 119,
                    spread: 360,
                    startVelocity: 40,
                    elementCount: 70,
                    dragFriction: 0.12,
                    duration: 10000,
                    stagger: 10,
                    width: "10px",
                    height: "10px",
                    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
                }} />

            <Heading my={ 3 } color='gray.600' className='animate__animated animate__bounceInLeft' >You did it!</Heading>
            
            <Heading my={ 3 } color='green.500' className='animate__animated animate__bounceInRight' >{ `${ score } of ${ maxScore } points` }</Heading>

            <Image maxW={ 400 } src='./illustration_2.png' className='animate__animated animate__fadeIn' />
            
        </LayoutFullscreen>
        
    )
}

export default ScoreScreen