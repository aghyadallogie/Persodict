export interface Word {
    authorId: string;
    translation: Translation[];
}

export interface Translation {
    [key: string]: string;
}

export interface Lingo {
    userId: string;
    text: string;
}