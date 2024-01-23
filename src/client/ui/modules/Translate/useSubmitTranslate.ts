import type {FormEvent} from 'react';

import {useTranslation} from '@/client/application/useCases/useTranslation';

export const useSubmitTranslate = () => {
    const {makeTranslation} = useTranslation();

    const handleSubmit = async (event: FormEvent) => {
        let textInput = event.target[0].value;

        event.preventDefault();

        if (!textInput) return;

        await makeTranslation({
            authorId: 'aghy',
            text: textInput
        });

        event.target[0].value = '';
    };

    return {handleSubmit};
};