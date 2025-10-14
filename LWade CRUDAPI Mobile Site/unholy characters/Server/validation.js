const { check } = require('express-validator');
const connection = require('./Model/connection'); // Adjusted path to connection.js

const characterNameValidation = check('characterName', 'Character Name must be at least 3 characters long.')
    .isLength({ min: 3 });

const characterAgeValidation = check('characterAge', 'Character Age must be a non-negative number.')
    .isInt({ min: 0 });

const genderValidation = check('gender', 'Please select a valid gender.')
    .isIn(['Male', 'Female', 'Non-Binary', 'Other']);

const nationalityValidation = check('nationality', 'Please select a valid nationality.')
    .isLength({ min: 1 });

const roleValidation = check('role', 'Please select a valid role.')
    .isIn(['Protagonist', 'Major Antagonist', 'Minor Antagonist', 'Major Character', 'Minor Character']);

const backstoryValidation = check('backstory', 'Backstory must be at least 10 characters long.')
    .isLength({ min: 10 });

const arcValidation = check('arc', 'Please select a valid arc.')
    .custom(async (value) => {
        const arcs = [
            'Newcomer Arc', 'Initiation Arc', 'Vasile Arc', 'Royal Arrival Arc',
            'Vasile Arc pt.2', 'Betrayal Arc', 'Hallucination Arc',
            'Investigation Arc', 'The Latter Days', 'Epilogue'
        ];
        if (!arcs.includes(value)) {
            throw new Error('Invalid arc selected.');
        }
        return true;
    });

const arcChaptersValidation = check('arcChapters', '# of Chapters must be at least 1.')
    .isInt({ min: 1 });

const chapterSummaryValidation = check('chapterSummary', 'Chapter Summary must be at least 10 characters long.')
    .isLength({ min: 10 });

module.exports = {
    characterNameValidation,
    characterAgeValidation,
    genderValidation,
    nationalityValidation,
    roleValidation,
    backstoryValidation,
    arcValidation,
    arcChaptersValidation, 
    chapterSummaryValidation 
};
