import type {FormEvent} from 'react';
import {useTranslation} from '@/client/application/useCases/useTranslation';
import { useSession } from 'next-auth/react';

export const useSubmitTranslate = (formRef: HTMLFormElement | null) => {
    const {data: session} = useSession();
    const {makeTranslation} = useTranslation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-expect-error: TypeScript cannot infer the type of event.target as HTMLFormElement
        const textInput = (event.target as HTMLFormElement)[0]?.value;

        if (!textInput) return;

        await makeTranslation({
            authorId: session?.user?.email as string,
            text: textInput
        });
        
        formRef?.reset();
    };

    return {handleSubmit};
};