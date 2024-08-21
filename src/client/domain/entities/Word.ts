export interface Word {
    authorId: string;
    id: string;
    translations: Translation[];
}

export interface Translation {
    lang: string;
    lingo: string;
}

export interface UserTranslations {
    data: Word[];
    status: string;
}

export interface MutationArgs {
    translation: string;
    language: string;
}