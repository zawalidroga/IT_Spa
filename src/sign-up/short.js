export const short = value => {
    if (typeof value === 'string') value.length < 6;
    return true;
}