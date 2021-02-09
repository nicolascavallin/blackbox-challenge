import React, { createContext, useEffect, useState } from 'react'
import QuestionScreen from './screens/Question'
import ScoreScreen from './screens/Score'
import WelcomeScreen from './screens/Welcome'
import { Question, Context, Answer } from './types'

const maxQuestion = 10

const AppContext = createContext( {} as Context )

const AppProvider: React.FC = () => {

    const [ step, setStep ] = useState( 0 )
    const [ questions, setQuestions ] = useState<Question[]>( [] )
    const [ answers, setAnswers ] = useState<Answer[]>( [] )

    useEffect(() => {

        fetch( `https://opentdb.com/api.php?amount=${ maxQuestion }` ).then( async res => setQuestions( (await res.json())['results'] ))

    }, [])

    const onRegisterAnswer = ( answer: Answer ) => setAnswers( [ ...answers, answer ] )

    const onNextStep = () => setStep( step + 1 )

    const state = {
        answers
    }
    const actions = {
        onRegisterAnswer,
        onNextStep,
    }

    return(
        <AppContext.Provider value={{ state, actions }}>
            {
                ( step === 0 ) && <WelcomeScreen />
            }
            { ( questions.length > 0 && ( step >= 1 && step <= maxQuestion ) ) && <QuestionScreen
                key={ questions[ step-1 ].question }
                question={ questions[ step-1 ] }
                index={ step }
                max={ maxQuestion }
            />}
            {
                ( step > maxQuestion ) && <ScoreScreen />
            }
        </AppContext.Provider>
    )
}

export { AppContext as default, AppProvider }