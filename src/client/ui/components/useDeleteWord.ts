import {useDeleteWordCase} from '@/client/application/useCases/useDeleteWordCase';

export const useDeleteWord = (wordId: string) => {
    const {deleteWord} = useDeleteWordCase();

    const handleDeleteWord = async () => {
        await deleteWord(wordId);
    };

    return {handleDeleteWord};
};