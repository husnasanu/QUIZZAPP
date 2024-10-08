

import React, { useState } from 'react';
import quizQuestions from './question.js';
import './App.css';

function App() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption === 0) {

            alert('Please select an answer before proceeding.');
            return;
        }

        const currentQuiz = quizQuestions[currentQuestion];
        const isCorrect = currentQuiz.options.find(opt => opt.text === selectedOption)?.isCorrect;
        if (isCorrect) {
            setScore(score + 1);
        }
        setSelectedOption(0);
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
// restart test
    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="App align-items-center d-flex justify-content-center">
            <div className="quiz shadow rounded"> 
                {showScore ? (
                    <div className="score text-center">
                        <h2 className='mb-5' style={{fontSize:'2em'}}>You scored {score} out of {quizQuestions.length}</h2>
                        <button onClick={handleRestartQuiz}>Restart Quiz</button>
                    </div>
                ) : (
                    <>
                        <div className="questionsection mb-5">
                            <div className="questionNum">
                                <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
                            </div>
                            <div className="questionDisp">
                                {quizQuestions[currentQuestion].question}
                            </div>
                        </div>
                        {/* option section */}
                        <div style={{flexDirection:'column'}} className="d-flex">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <label style={{marginBottom:'20px'}} key={index} className="option-label">
                                    <input className='mx-2'
                                        type="radio"
                                        name="option"
                                        value={option.text}
                                        checked={selectedOption === option.text}
                                        onChange={handleOptionChange}
                                    />
                                    {option.text}
                                </label>
                            ))}
                        </div>
                        <div style={{textAlign:'right'}} className="buttonsection mt-5">
                            <button onClick={handleNextQuestion}>
                                {currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
