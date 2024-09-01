import type {FormEvent} from 'react';
import {useTranslation} from '@/client/application/useCases/useTranslation';
import {useSession} from 'next-auth/react';
import SettingsService from '@/client/application/services/SettingsService';
import {useRouter} from 'next/router';

export const useSubmitTranslate = (formRef: HTMLFormElement | null) => {
    const router = useRouter();
    const {data: session} = useSession();
    const {makeTranslation} = useTranslation();
    const userEmail = session?.user?.email as string;


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-expect-error: TypeScript cannot infer the type of event.target as HTMLFormElement
        const textInput = (event.target as HTMLFormElement)[0]?.value;

        if (!textInput) return;

        const {data} = await SettingsService.getUserSettings(userEmail);

        if (!data?.userLangs?.length) return void router.replace("/settings");

        await makeTranslation({
            authorId: session?.user?.email as string,
            text: textInput
        });

        formRef?.reset();
    };

    return {handleSubmit};
};