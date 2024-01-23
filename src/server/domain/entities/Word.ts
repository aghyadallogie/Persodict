export interface Word {
    authorId: string;
    translations: Translation[];
}

export type Translation = Record<string, string>;

export interface Lingo {
    authorId: string;
    text: string;
}