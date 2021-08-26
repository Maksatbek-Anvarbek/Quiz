import React, { useState } from 'react';
import classes from './QuizCreator.module.css'
import { createControl } from "../../form/formFramework";
import Button from "../../components/UI/Button/button";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/select/select";

const createOption = (num) => {
    return createControl({
        label: `Вариант ${num}`,
        errorMessage: 'Значение не может быть пустым',
        id: num
    }, { required: true })
}

const createFormControl = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1:  createOption(1),
        option2: createOption(2),
        option3: createOption(3),
        option4: createOption(4),
    }
}

const QuizCreator = () => {
    const [formControls, setFormControls] = useState(createFormControl())
    const [rightAnswerId, setRightAnswerId] = useState(1)
    const [quiz, setQuiz] = useState([])
    const handleOnChangeControl = (event, controlName) => {
        const formControl = {...formControls}
        const control = formControl[controlName]

        control.value = event

        formControl[controlName] = control
        setFormControls(formControl)
    }

    const selectChangeHandler = e => {
        setRightAnswerId(+e.target.value)
    }


    const select = <Select
    label='Выберите правильный ответ'
    value={rightAnswerId}
    onChange={selectChangeHandler}
    options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 }
    ]}
    />



    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const addQuestionHandler = () => {
        const idx = quiz.length + 1

        const {question, option1, option2,option3,option4,} = setFormControls

        const questionItem = {
            question: question.value,
            rightAnswerId,
            id: idx,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }
        setQuiz([...quiz, questionItem])
        setRightAnswerId(1)
        setFormControls(createFormControl())
    }

    const createQuizHandler = (e) => {
        e.preventDefault()
        console.log(createFormControl())
    }


    const renderControl = () => {
        return Object.keys(formControls).map((controlName, idx) => {
            let control = formControls[controlName]
            return (
                <>
                    <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    validate={!!control.validated}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={(e) => handleOnChangeControl(e.target.value, controlName)}
                />
                    { idx === 0 ? <hr/> : '' }
                    </>
            )
        })
    }

    return (
            <div className={classes.QuizCreator}>
                <div>
            <h1>Создать тест</h1>
            <form onSubmit={handleSubmit}>
                {
                    renderControl()
                }
               
                { select }

                <Button
                    type='primary'
                    onClick={addQuestionHandler}
                >
                   Создать вопрос
                </Button>
                <Button
                    type='success'
                    onClick={createQuizHandler}
                >
                   Создать тест
                </Button>
            </form>
                </div>
            </div>
    );
};

export default QuizCreator;