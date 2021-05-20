// Get error message corresponding to Firebase error code.
export const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            return 'Email or password is not correct';

        default:
            return 'Unable to sign in';
    }
};