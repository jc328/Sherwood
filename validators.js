const { User, Transaction, Stock } = require('./models');
const { check, validationResult } = require('express-validator');

const userValidators = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for First Name')
        .isLength({ max: 50 })
        .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ max: 50 })
        .withMessage('Last Name must not be more than 50 characters long'),
    check('email')
        .exists({checkFalsy: true})
        .withMessage('Please enter an e-mail address.')
        .isLength({ max: 255 })
        .withMessage('E-mail addresses must not exceed 255 characters.')
        .isEmail()
        .withMessage('Please enter a valid e-mail address.')
        .custom(value => {
            return User.findOne({ where: { email: value }})
            .then((user) => {
                if (user) {
                    return Promise.reject("The provided e-mail address is already in use.")
                }
            })
        }),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Please provide a password.')
        .isLength({ max: 50 })
        .withMessage('Passwords must not exceed 50 characters.')
        // DOES NOT ALLOW FOR SIMPLE PASSWORDS
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
];

const loginValidator = [
    check('email')
        .exists({checkFalsy: true})
        .withMessage('Please enter an e-mail address.')
        .isEmail()
        .withMessage('Please enter a valid e-mail address.'),
    check('password')
        .exists({checkFalsy: true})
        .withMessage('Please provide a password.')
];

const transactionValidtor = [
    check('number-shares-bought')
        .custom(value => {
            // check current session id
            // get user id
            // find user's total balance
            // if less than balance ok to post transaction
        }),
    check('number-shares-sold')
        .custom(value => {
            // check current session id
            // get user id
            // get current stock
            // get # of shares user owns for current stock
            // if # of shares > request
            // post transaction
        }),
]

module.exports = {
    userValidators,
    transactionValidtor,
    loginValidator
};
