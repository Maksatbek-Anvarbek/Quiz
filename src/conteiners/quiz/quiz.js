import React, { useState } from 'react';
import classes from './quiz.module.css'
import ActiveQuiz from "../../components/activeQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/finishedQuiz";

const Quiz = () => {
    const [quiz, setQuiz] = useState([
    {
        question: 'Какого света небо?',
        id: 1,
        rightAnswer: 4,
        answer: [
            {text: 'вопрос 1', id: 1 },
            {text: 'вопрос 2', id: 2 },
            {text: 'вопрос 3', id: 3 },
            {text: 'синий', id: 4 }
        ]
    },
        {
        question: 'Какого цвета солнце?',
            id: 2,
            rightAnswer: 3,
        answer: [
            {text: 'вопрос 1', id: 1 },
            {text: 'желтый', id: 2 },
            {text: 'вопрос 3', id: 3 },
            {text: 'вопрос 4', id: 4}
        ]
    }
    ])
    const [activeAnswer, setActiveAnswer]= useState(0)
    const [answerState, setAnswerState] = useState( null)
    const [isFinished, setIsFinished]= useState(false)
    const [results, setResults] = useState({})

    const handleNextAnswer = (answerId) => {

        const question = quiz[activeAnswer]
        const result = results

        if (question.rightAnswer === answerId) {
            result[question.id] = 'success'
            setResults(result)
            setAnswerState({
            [answerId]: 'Success'
            })
        } else {
            result[question.id] = 'error'
            setResults(result)
            setAnswerState({
                [answerId]: 'Error'
            })
        }
      let timeout = setTimeout(() => {
          if(quizFinished()) {
            setIsFinished(true)
          }else {
              setActiveAnswer(activeAnswer + 1)
              setAnswerState(null)
          }
          clearTimeout(timeout)
      }, 1500)
    }

    const quizFinished = () => {
        return activeAnswer + 1 === quiz.length
    }

    const onRetry = () => {
        setResults({})
        setIsFinished(false)
        setAnswerState(null)
        setActiveAnswer(0)
    }
    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                {
                    isFinished ?  <FinishedQuiz
                        results={results}
                        quiz={quiz}
                        onRetry={onRetry}
                        /> :
                        <>
                            <h1>
                                Пройдите опрос
                            </h1>
                            <ActiveQuiz
                                answer={quiz[activeAnswer].answer }
                                question={quiz[activeAnswer].question }
                                quizLength={quiz.length }
                                activeAnswer={activeAnswer +1 }
                                handleNextAnswer={ handleNextAnswer }
                                answerState={answerState }

                            />
                        </>
                }
            </div>
        </div>
    );
};

export default Quiz;