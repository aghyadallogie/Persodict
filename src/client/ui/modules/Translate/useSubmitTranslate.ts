import type {FormEvent} from 'react';

import {useTranslation} from '@/client/application/useCases/useTranslation';
import { useSession } from 'next-auth/react';

export const useSubmitTranslate = () => {
    const {data: session} = useSession();
    const {makeTranslation} = useTranslation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        let textInput = (event.target as HTMLFormElement)[0].value;

        if (!textInput) return;

        await makeTranslation({
            authorId: session?.user?.email as string,
            text: textInput
        });

        (event.target as HTMLFormElement).value = '';
    };

    return {handleSubmit};
};