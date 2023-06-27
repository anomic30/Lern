import React, { useEffect, useLayoutEffect, useState } from 'react';
import './Quiz.scss'

import useUserStore from '../../store/useUserStore';
import { Button, Card, Checkbox } from '@material-tailwind/react';
import useQuizStore from '../../store/useQuizStore';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Axios from 'axios';

const Quiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const user = useUserStore((state) => state.user);
    const quiz = useQuizStore((state) => state.quiz);
    const setQuiz = useQuizStore((state) => state.setQuiz);
    const { quizId } = useParams();

    const APP_SERVER = import.meta.env.VITE_APP_SERVER;

    const fetchQuiz = async () => {
        if (quiz?._id === quizId) return;
        try {
            const quizResp = await Axios.get(APP_SERVER + "/api/user/quiz/" + quizId, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setQuiz(quizResp.data.quiz);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchQuiz();
    }, []);

    let title = "";
    let questions = [];

    if (quiz) {
        title = quiz.title;
        questions = quiz.questions;
    }
    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionChange = (optionIndex) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[currentQuestionIndex] = optionIndex;
        setSelectedOptions(updatedOptions);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    };

    const handleQuizSubmit = () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            if (question.answer === selectedOptions[index]) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setShowResult(true);
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOptions([]);
        setScore(0);
        setShowResult(false);
    };

    const renderQuizQuestions = () => {
        return (
            <div className="flex flex-col">
                <h2 className="text-2xl font-bold mb-8">{title}</h2>
                <div className="flex flex-col space-y-2">
                    <p>{currentQuestion.question}</p>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Checkbox checked={selectedOptions[currentQuestionIndex] === index} onChange={() => handleOptionChange(index)} color='gray' />
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 sm:mt-8">
                    <button
                        className="px-4 py-2 bg-emerald-300 text-white rounded"
                        disabled={currentQuestionIndex === 0}
                        onClick={handlePreviousQuestion}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-emerald-300 text-white rounded"
                        disabled={currentQuestionIndex === questions.length - 1}
                        onClick={handleNextQuestion}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const renderResultPage = () => {
        return (
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
                <p className="mb-8 text-xl">Your Score: <span className='text-emerald-500'>{score}/4</span></p>
                <p className='self-start font-bold text-xl mb-4'>Correct Answers:</p>
                <ul className="self-start list-disc ml-4">
                    {questions.map((question, index) => (
                        <li key={index} className="mb-1">
                            {question.question}: {question.options[question.answer]}
                        </li>
                    ))}
                </ul>
                <button
                    className="px-4 py-2 bg-emerald-500 text-white rounded mt-4"
                    onClick={handleRetakeQuiz}
                >
                    Retake Quiz
                </button>
            </div>
        );
    };

    return (
        <Card className="w-full p-2">
            <div className="flex flex-wrap h-screen">
                <div className="flex flex-col justify-between w-full lg:w-1/2 md:w-2/3 px-4 sm:px-8">
                    <h1 className="text-3xl md:text-3xl lg:text-5xl">Quiz</h1>

                    {!quizStarted ? (
                        <div className='h-3/6 w-full bg-emerald-100 self-center rounded-2xl flex flex-col content-center justify-center flex-wrap gap-2 md:gap-5'>
                            <h1 className='text-xl md:text-3xl text-center'> Topic: {quiz?.title}</h1>
                            <Button className='mx-auto bg-emerald-500' onClick={() => setQuizStarted(true)}>Start</Button>
                        </div>
                    ) : (
                        <div className="container mx-auto px-4 py-8">
                            {showResult ? (
                                renderResultPage()
                            ) : (
                                <>
                                    {renderQuizQuestions()}
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="px-4 py-2 bg-emerald-500 text-white rounded"
                                            onClick={handleQuizSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <p className='pb-4'>This quiz is AI-generated and for entertainment purposes only.</p>
                </div>
                <div className="hidden w-full lg:w-1/2 md:w-1/3 md:block overflow-hidden quiz-img"></div>
            </div>
        </Card>
    );
};

export default Quiz;