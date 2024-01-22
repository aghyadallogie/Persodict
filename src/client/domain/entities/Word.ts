export interface Word {
    authorId:    string;
    id:          string;
    translation: Translation[];
}

export interface Translation {
    lang: string;
    lingo: string;
}