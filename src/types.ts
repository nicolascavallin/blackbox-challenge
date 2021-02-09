export interface Question {
    index: number
    category: string
    type: 'multiple' | 'boolean'
    difficulty: 'easy' | 'medium' | 'hard'
    question: string
    correct_answer: string
    incorrect_answers: string[]   
}

export interface Context {
    state: {
        answers: Answer[]
    }
    actions: {
        onRegisterAnswer: ( answer: Answer ) => void
        onNextStep: () => void
    }
}

export interface Answer {
    answer: string
    question: Question
}