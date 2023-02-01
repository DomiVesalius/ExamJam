// Allows for matching student AND staff emails
// Example: "bob.jones@mail.utoronto.ca", "john.doe@utoronto.ca"
const UOFT_EMAIL_REGEX = RegExp('^.+@(mail\\.utoronto|utoronto)\\.ca$');

/**
 * Validates if the given value matches the email regex for a UofT domain
 */
export const emailValidation = {
    validator: (value: string): boolean => UOFT_EMAIL_REGEX.test(value),
    message: (props: any): string => `${props.value} is not a valid UofT email address`
};
