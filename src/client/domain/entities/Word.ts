export interface Word {
    authorId:    string;
    id:          string;
    translation: Translation[];
}

export interface Translation {
    // [key: string]: string;
    lang: string;
    lingo: string;
}