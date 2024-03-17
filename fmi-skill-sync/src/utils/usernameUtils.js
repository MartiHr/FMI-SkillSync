export const extractUsernameFromEmail = (email) => {
    // Split the email address by '@'
    const parts = email?.split('@');
    // The username is the first part before '@'
    if (email !== undefined) {
        const username = parts[0];
        return username;
    }
    return;
}