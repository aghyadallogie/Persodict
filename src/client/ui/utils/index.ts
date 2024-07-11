export const shade = (color: string, percentage: number, shade: 'light' | 'dark' = 'dark') => {
    if (typeof color !== 'string') throw new Error('Color must be of type string');

    return `color-mix(in srgb, ${color}, ${shade === 'dark' ? 'black' : 'white'} ${percentage}%)` as const;
}