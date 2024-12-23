/**
 * Adjusts the shade of a given color by mixing it with either black or white.
 *
 * @param {string} color - The color to be adjusted, specified as a string.
 * @param {number} percentage - The percentage of the shade to apply (0-100).
 * @param {'light' | 'dark'} [shade='dark'] - The type of shade to apply; can be 'light' or 'dark'. Defaults to 'dark'.
 * @throws {Error} Throws an error if the color is not a string.
 * @returns {string} The resulting color after mixing.
 */
export const shade = (color: string, percentage: number, shade: 'light' | 'dark' = 'dark') => {
    if (typeof color !== 'string') throw new Error('Color must be of type string');

    return `color-mix(in srgb, ${color}, ${shade === 'dark' ? 'black' : 'white'} ${percentage}%)` as const;
}

/**
 * Renders the correct flag code based on the provided language.
 * 
 * @param {string} lang - The language code for which the flag is to be rendered.
 * @returns {string} The corresponding flag code for the given language.
 * If the language is not recognized, it returns the input language code.
 */
export const renderCorrectFlag = (lang: string) => {
    if (lang === 'en') return 'gb';
    if (lang === 'sv') return 'se';
    if (lang === 'el') return 'gr';
    if (lang === 'ja') return 'jp';
    if (lang === 'uk') return 'ua';
    if (lang === 'ar') return 'ps';
    return lang;
};

/**
 * Generates a random index for the given array.
 * 
 * @param {T[]} array - The array from which to generate a random index.
 * @returns {number} A random index between 0 and the length of the array minus one.
 */
export const makeRndIndexFor = <T,>(array: T[]): number => Math.floor(Math.random() * array.length);