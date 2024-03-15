export const errorMessages = {
    emailError: 'Email should be longer than 3 characters',
    passwordError: 'Password should be at least 6 characters',
    rePassError: 'Password and repeat password do not match',
    titleErrorMin: 'Title should be at least 3 characters long',
    titleErrorMax: 'Title cannot be longer than 20 characters',
    subjectErrorMin: 'Subject should be at least 2 characters long',
    subjectErrorMax: 'Subject cannot be longer than 20 characters',
    imgUrlError: 'You should provide image url',
    priceErrorMin: 'Price should be a minimum of 1000$',
    priceErrorMax: 'Price cannot be bigger than 10,000,000$',
    commentError: 'Comment should be at least 20 characters long',
}

export const getErrorMessage = (errorField, value) => {
    switch (errorField) {
        case 'email':
            return value.length <= 3 ? errorMessages.emailError : '';
        case 'password':
            return value.length < 6 ? errorMessages.passwordError : '';
        case 'title':
            return value.length >= 3 ? (value.length > 20 ? errorMessages.titleErrorMax : '') : errorMessages.titleErrorMin;
        case 'subject':
            return value.length >= 2 ? (value.length > 20 ? errorMessages.subjectErrorMax : '') : errorMessages.subjectErrorMin;
        case 'imgUrl':
            return value.length < 10 ? errorMessages.imgUrlError : '';
        case 'price':
            return value >= 1000  ? (value > 10000000 ? errorMessages.priceErrorMax : '') : errorMessages.priceErrorMin;
        case 'comment':
            return value.length < 20 ? errorMessages.commentError : '';
        default:
            return '';
    }
}