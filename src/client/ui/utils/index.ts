
/**
 * Adjusts the shade of a given color by mixing it with either black or white.
 *
 * @param {string} color - The color to be adjusted, specified as a string.
 * @param {number} percentage - The percentage of the shade to apply (0-100).
 * @param {'light' | 'dark'} [shade='dark'] - The type of shade to apply; can be 'light' or 'dark'. Defaults to 'dark'.
 * @throws {Error} Throws an error if the color is not a string.
 * @returns {string} The resulting color after mixing.
 *
 * @example
 * // Returns a darker shade of red
 * const darkerRed = shade('red', 50, 'dark');
 * 
 * // Returns a lighter shade of blue
 * const lighterBlue = shade('blue', 30, 'light');
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

/**
 * Shuffles the elements of the provided array in a random order.
 *
 * This function implements the Fisher-Yates (Knuth) shuffle algorithm, which
 * ensures that each permutation of the array is equally likely. The original
 * array remains unchanged, and a new shuffled array is returned.
 *
 * @param {T[]} array - The array to be shuffled. It can contain elements of any type.
 * @returns {T[]} A new array containing the elements of the input array in random order.
 * 
 * @template T - The type of elements in the array.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers);
 * console.log(shuffledNumbers); // Output could be [3, 1, 4, 5, 2] or any other permutation.
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Converts a hexadecimal color string to an RGBA or RGB color string.
 *
 * The function supports 3, 4, 6, and 8 character hex codes. 
 * - 3-character hex codes are expanded to 6 characters (e.g., `#abc` becomes `#aabbcc`).
 * - 4-character hex codes include an alpha channel and are expanded similarly (e.g., `#abcd` becomes `#aabbccdd`).
 *
 * @param {string} hex - The hexadecimal color string, which may start with a '#' character.
 * @returns {string} The corresponding RGB or RGBA color string.
 * @throws {Error} Throws an error if the input is not a valid hex color string.
 *
 * @example
 * // Returns 'rgba(170, 187, 204, 0.867)'
 * hexToRgba('#aabbccdd');
 *
 * @example
 * // Returns 'rgb(170, 187, 204)'
 * hexToRgba('#aabbcc');
 */
export const hexToRgba = (hex: string) => {
    const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
    if (!hexRegex.test(hex)) {
        throw new Error('Invalid hex color string');
    }

    hex = hex.replace('#', '');

    if (hex.length === 3 || hex.length === 4) {
        const chars = hex.split('');
        if (hex.length === 3) {
            hex = chars.map(char => char + char).join('');
        } else {
            hex = chars.map(char => char + char).join('');
        }
    }

    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    if (hex.length === 8) {
        const a = (parseInt(hex.substr(6, 2), 16) / 255).toFixed(3);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
};