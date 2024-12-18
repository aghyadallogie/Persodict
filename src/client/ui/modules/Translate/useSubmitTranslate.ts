import type { FormEvent } from 'react';
import { useTranslation } from '@/client/application/useCases/useTranslation';
import { useSession } from 'next-auth/react';

/**
 * Custom hook to handle form submission for translating words.
 *
 * This hook manages the translation submission process, including preventing the default form action,
 * extracting the input value, and invoking the translation function. It also handles potential errors.
 *
 * @param {HTMLFormElement | null} formRef - Reference to the form element.
 * @returns {Object} An object containing the `handleSubmit` function.
 */
export const useSubmitTranslate = (formRef: HTMLFormElement | null) => {
    const { data: session } = useSession();
    const { makeTranslation, isLoading } = useTranslation();
    
    /**
     * Handles form submission, translating the input text.
     *
     * @param {FormEvent<HTMLFormElement>} event - The form submission event.
     * @async
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const textInput = (event.target as HTMLFormElement)[0];

        if (!textInput) return;

        try {
            if (textInput instanceof HTMLInputElement) {
                await makeTranslation({
                    authorId: session?.user?.email as string,
                    text: textInput.value
                });
                textInput.value = '';
            }
        } catch (error) {
            console.error("Translation error:", error);
        }
    };

    return { handleSubmit, isLoading };
};