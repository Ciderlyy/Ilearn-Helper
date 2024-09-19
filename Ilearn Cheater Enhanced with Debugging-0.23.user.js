// ==UserScript==
// @name         Ilearn Cheater Enhanced with Debugging
// @namespace    http://tampermonkey.net/
// @version      0.23
// @description  Save and autofill answers for multiple choice, open-ended, and drag-and-drop questions with error handling
// @author       Ciderly
// @match        https://ilearn.learnsaf.gov.sg/*  // Updated to match the specific learning website
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Debugging function to log messages or errors to the console
    function debugLog(message) {
        console.log(`[Ilearn Cheater Debug]: ${message}`);
    }

    // Function to log answers, including correct ones when results are submitted
    function logAnswers() {
        try {
            const inputs = document.querySelectorAll('input, textarea, select'); // Select all input fields, including dropdowns
            const questionId = new URL(window.location.href).hash; // Get unique identifier from the URL
            let answerLog = JSON.parse(localStorage.getItem(`quizAnswers_${questionId}`) || '{}');

            // Save drag-and-drop answers by tracking container elements
            const dragItems = document.querySelectorAll('.drag-item'); // Adjust based on the drag-and-drop implementation
            dragItems.forEach(dragItem => {
                const container = dragItem.closest('.drop-container'); // Adjust selector based on the structure
                answerLog[dragItem.dataset.questionId] = {
                    userAnswer: container ? container.id : null, // Store the container ID where the item was dropped
                    correctAnswer: dragItem.dataset.correctAnswer || null // If available, store the correct answer
                };
            });

            inputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    answerLog[input.name] = {
                        userAnswer: input.checked,
                        correctAnswer: input.dataset.correctAnswer || null // If available, store the correct answer
                    };
                } else {
                    answerLog[input.name] = {
                        userAnswer: input.value,
                        correctAnswer: input.dataset.correctAnswer || null // If available, store the correct answer
                    };
                }
            });

            // Save answers in local storage under the question ID
            localStorage.setItem(`quizAnswers_${questionId}`, JSON.stringify(answerLog));
            debugLog('Answers successfully logged.');
        } catch (error) {
            debugLog(`Error logging answers: ${error}`);
        }
    }

    // Function to auto-fill previously saved correct answers
    function fillCorrectAnswers() {
        try {
            const currentQuestionId = new URL(window.location.href).hash; // Get unique identifier from the URL
            const savedAnswers = JSON.parse(localStorage.getItem(`quizAnswers_${currentQuestionId}`) || '{}');

            for (const [question, answerData] of Object.entries(savedAnswers)) {
                const input = document.querySelector(`[name="${question}"]`);
                const dragItem = document.querySelector(`[data-question-id="${question}"]`);

                if (input) {
                    if (answerData.correctAnswer !== null) {
                        // Auto-fill with the correct answer if available
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = answerData.correctAnswer;
                        } else {
                            input.value = answerData.correctAnswer;
                        }
                        debugLog(`Auto-filled input field: ${question}`);
                    }
                } else if (dragItem) {
                    // Auto-fill drag-and-drop answers by placing the item in the correct container
                    const container = document.getElementById(answerData.correctAnswer);
                    if (container) {
                        container.appendChild(dragItem); // Simulate placing the drag item in the correct container
                        debugLog(`Auto-filled drag-and-drop: ${question}`);
                    }
                }
            }
        } catch (error) {
            debugLog(`Error auto-filling answers: ${error}`);
        }
    }

    // Attach to the form submission to log answers
    try {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', logAnswers);
            debugLog('Form submission handler attached.');
        } else {
            debugLog('No form found to attach submission handler.');
        }
    } catch (error) {
        debugLog(`Error attaching form submission handler: ${error}`);
    }

    // Check for correct answer feedback and save correct answers after submission
    function saveCorrectAnswers() {
        try {
            const correctAnswers = document.querySelectorAll('.correct-answer'); // Adjust based on how the correct answers are displayed on the result page
            const questionId = new URL(window.location.href).hash; // Get unique identifier from the URL
            let savedAnswers = JSON.parse(localStorage.getItem(`quizAnswers_${questionId}`) || '{}');

            correctAnswers.forEach(correctAnswer => {
                const inputName = correctAnswer.dataset.inputName; // Assuming there's a way to link correct answer to the input field
                const correctValue = correctAnswer.innerText; // Assuming the correct answer is displayed as text
                if (savedAnswers[inputName]) {
                    savedAnswers[inputName].correctAnswer = correctValue; // Save the correct answer
                }
            });

            // Update local storage with the correct answers
            localStorage.setItem(`quizAnswers_${questionId}`, JSON.stringify(savedAnswers));
            debugLog('Correct answers successfully saved.');
        } catch (error) {
            debugLog(`Error saving correct answers: ${error}`);
        }
    }

    // Trigger saveCorrectAnswers after form submission if the results page loads
    try {https://ilearn.learnsaf.gov.sg/learner.html?s=3IjdrRWal50XyMzXadEUUBTNthHahlXc#home/topic&card=5725118
        window.addEventListener('load', () => {
            // Assume a condition here to detect if we are on a result page
            if (document.querySelector('.results-page')) { // Adjust this selector to detect the result page
                saveCorrectAnswers();
                debugLog('Results page detected, saving correct answers.');
            }
        });
    } catch (error) {
        debugLog(`Error in load event listener: ${error}`);
    }

    // Auto-fill correct answers when revisiting the question
    try {
        fillCorrectAnswers();
    } catch (error) {
        debugLog(`Error auto-filling answers on page load: ${error}`);
    }
})();
