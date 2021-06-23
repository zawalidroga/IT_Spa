export const required = value => {
    return value === undefined || value === null || value === '';
};