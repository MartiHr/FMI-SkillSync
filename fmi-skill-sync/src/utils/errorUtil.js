export const errorMessages = {
    emailError: 'Email should be longer than 3 characters',
    passwordError: 'Password should be at least 6 characters',
    rePassError: 'Password and repeat password do not match',
    titleErrorMin: 'Title should be at least 3 characters long',
    titleErrorMax: 'Title cannot be longer than 20 characters',
    rewardErrorMin: 'Reward should be at least 3 characters long',
    rewardErrorMax: 'Reward cannot be longer than 20 characters',
    subjectErrorMin: 'Subject should be at least 2 characters long',
    subjectErrorMax: 'Subject cannot be longer than 20 characters',
    numberOfPeopleErrorErrorMin: 'There should be at least 2 people',
    numberOfPeopleErrorErrorMax: 'There should be at most 20 people',
    imgUrlError: 'You should provide image url',
    commentError: 'Comment should be at least 20 characters long',
    descriptionError: 'Description should be at least 20 characters long',
    rewardError: 'Description should be at least 20 characters long',
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
        case 'numberOfPeople':
            return value >= 1 ? (value > 20 ? errorMessages.numberOfPeopleErrorMax : '') : errorMessages.numberOfPeopleErrorMin;
        case 'reward':
            return value.length >= 2 ? (value.length > 20 ? errorMessages.rewardErrorMax : '') : errorMessages.rewardErrorMin;
        case 'imgUrl':
            return value.length < 10 ? errorMessages.imgUrlError : '';
        case 'comment':
            return value.length < 20 ? errorMessages.commentError : '';
        case 'description':
            return value.length < 20 ? errorMessages.descriptionError : '';
        default:
            return '';
    }
}