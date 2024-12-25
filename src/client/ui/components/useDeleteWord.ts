import { useDeleteWordCase } from '@/client/application/useCases/useDeleteWordCase';

/**
 * Custom hook to handle the deletion of a word.
 *
 * This hook provides a function to delete a word identified by its ID.
 * It utilizes the `useDeleteWordCase` use case to perform the deletion.
 *
 * @param {string} wordId - The ID of the word to be deleted.
 * @returns {Object} An object containing the `handleDeleteWord` function.
 * @returns {Function} return.handleDeleteWord - A function that, when called,
 * deletes the word with the specified `wordId`.
 */
export const useDeleteWord = (wordId: string) => {
    const { deleteWord } = useDeleteWordCase();

    const handleDeleteWord = async () => {
        await deleteWord(wordId);
    };

    return { handleDeleteWord };
};