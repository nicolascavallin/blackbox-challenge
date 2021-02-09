import React, { useContext, useEffect, useState } from 'react'
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import AppContext from '../../context'
import LayoutFullscreen from '../../layout/LayoutFullscreen'
import Button from '../../ui/Button'
import { Question } from '../../types'
import _ from 'underscore'


interface Props {
    index: number
    question: Question
    max: number
}

const QuestionScreen: React.FC<Props> = ({ index, question, max }) => {

    const { actions: { onRegisterAnswer, onNextStep } } = useContext( AppContext )

    const [ answers, setAnswers ] = useState<string[]>( [] )
    const [ selectedAnswer, setSelectedAnswer ] = useState<string>( '' )
    const [ next, setNext ] = useState( false )

    const onAnswer = ( answer: string ) => {

        setSelectedAnswer( answer )

        onRegisterAnswer( { question, answer } )

        setTimeout(() => {
            setNext( true )
            setTimeout(() => onNextStep(), 500)
        }, 2750);
        
    }

    useEffect(() => {

        const answers = [ ...question.incorrect_answers, question.correct_answer ]
        setTimeout(() => {
            setAnswers( shuffle( answers ) )
        }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <LayoutFullscreen>

            <Flex 
                w='100%' 
                justify='space-between' 
                mb={ 6 } 
                className={ ( next ) ? 'animate__animated animate__fadeOutUp animate__faster' : 'animate__animated animate__fadeInDown' }
                >
                <Box>
                    <Text fontSize='xl' fontWeight={ 600 } color='gray.500'>{ question.category }</Text>
                    <Text 
                        fontWeight={ 500 }
                        color={
                        ( question.difficulty === 'easy' ) 
                            ? 'green.500'
                            : ( question.difficulty === 'medium' ) 
                                ? 'yellow.500'
                                : ( question.difficulty === 'hard' )
                                    ? 'red.500'
                                    : 'blue.500'
                    }>{ question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1) }</Text>
                </Box>
                <Text fontWeight={ 500 } color='gray.500'>{ ( index === max ) ? 'last question' : index + ' of ' + max }</Text>
            </Flex>

            
            <Heading 
                className={ ( next ) ? 'animate__animated animate__bounceOut animate__faster' : 'animate__animated animate__zoomInDown' }
                my={ 6 } 
                color='gray.600' 
                textAlign='center'>{ _.unescape( question.question.replace( /&#(?:x([\da-f]+)|(\d+));/ig, ( _, hex, dec ) => String.fromCharCode( dec || +('0x' + hex) ) ) ) }</Heading>

        
            { ( answers.length > 0 ) && 
            <Stack 
                spacing={ 3 } 
                className={ ( next ) ? 'animate__animated animate__fadeOutDown animate__faster' : 'animate__animated animate__fadeInUp' }
                >
                {
                    answers.map( answer => <Button 
                        key={ answer }
                        buttonProps={{
                            onClick: () => onAnswer( answer ),
                            isDisabled: ( selectedAnswer.length > 0 )
                        }}
                        >
                            { _.unescape( answer.replace( /&#(?:x([\da-f]+)|(\d+));/ig, ( _, hex, dec ) => String.fromCharCode( dec || +('0x' + hex) ) ) ) }
                        </Button>)
                }
            </Stack> }

            { selectedAnswer &&  
                <Heading 
                    size='lg'
                    my={ 6 } 
                    className={ ( next ) ? 'animate__animated animate__fadeOutDownBig animate__faster' : 'animate__animated animate__bounceIn' }
                    color={ selectedAnswer === question.correct_answer ? 'green.400' : 'red.400' }

                    >
                        { ( selectedAnswer === question.correct_answer ) && ( ( index % 3 === 0 ) ? 'Oh yes, I like it!' : ( index % 2 === 0 ) ? 'Nice, you rock!' : 'You know how to Google faster!' ) }
                        { ( selectedAnswer !== question.correct_answer ) && ( ( index % 3 === 0 ) ? 'No comments... Next.' : ( index % 2 === 0 ) ? 'Oops, nope.' : 'Really? Come on...' ) }
                </Heading>
            }

            
        </LayoutFullscreen>
    )
}

export default QuestionScreen

function shuffle( array: string[] ) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }