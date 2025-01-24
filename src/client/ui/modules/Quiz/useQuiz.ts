import type { Word } from "@/client/domain/entities/Word";
import { useEffect, useState } from 'react';
import { makeRndIndexFor, shuffleArray } from "@/client/ui/utils";
import { useHistory } from "@/client/ui/modules/History/useHistory";
import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { useSession } from "next-auth/react";
import { useNotifications } from "@/client/ui/components/action/Notifications/NotificationContext";

/**
 * Custom hook for managing a quiz game with random words and languages.
 *
 * This hook selects a random word and language from the provided lists,
 * generates options for the quiz, and tracks the user's streak of correct answers.
 *
 * @returns {Object} An object containing:
 *   - {string | null} randomLang - The randomly selected language for the current quiz question.
 *   - {Word | null} randomWord - The randomly selected word for the current quiz question.
 *   - {string | null} randomWord - The English translation of the randomly selected word.
 *   - {number} streak - The current streak of correct answers.
 *   - {Function} validateAnswer - A function to validate the user's answer against the target word.
 *
 * @example
 * const { options, randomLang, randomWord, streak, validateAnswer } = useQuiz(['en', 'es'], words);
 */
export const useQuiz = () => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const { addNotification } = useNotifications();
    const { data: session } = useSession();
    const { orderedTranslations: words, isLoading: isWordsLoading } = useHistory()
    const { userSettings, isLoading: isLangsLoading } = useGetUserSettings(session?.user?.email as string);
    const langs = userSettings?.data?.userLangs ?? [];
    // local state for quiz
    const [randomWord, setRandomWord] = useState<Word | null>(null);
    const [randomLang, setRandomLang] = useState<string | null>(null);
    const [streak, setStreak] = useState<number>(0);

    const isLoading = !langs || !words || isLangsLoading || isWordsLoading;
    // randomly set a word and a language to quiz the user with
    useEffect(() => {
        const randomWordIndex = makeRndIndexFor(words);
        const randomLangIndex = makeRndIndexFor(langs);
        setRandomWord(words[randomWordIndex]);
        setRandomLang(langs[randomLangIndex]);
    }, [streak, isLoading]);
    // prepare the english word to quiz the user with and its meaning in a random language
    const englishWord = randomWord?.translations.find(translation => translation.lang === 'en')?.lingo ?? null;
    const targetWord = randomWord?.translations.find(translation => translation.lang === randomLang)?.lingo ?? null;
    // generate and shuffle options
    useEffect(() => {
        if (randomWord && targetWord && !isLoading) {
            const newOptions = shuffleArray([
                targetWord,
                ...words
                    .filter(word => word !== randomWord)
                    .map(word => word.translations.find(translation => translation.lang === randomLang)?.lingo)
                    .filter(translation => translation !== undefined)
                    .slice(0, 3)
            ]);

            setShuffledOptions(newOptions);
        }
    }, [targetWord]);
    // validate clicked answer
    const validateAnswer = (answer: string) => {
        if (answer === targetWord) {
            addNotification('', 'success', 500);
            setStreak(prevStreak => prevStreak + 1);
        } else {
            addNotification('', 'error', 500);
            setStreak(0);
        }
    };

    return {
        isLoading,
        options: shuffledOptions,
        randomLang,
        randomWord: englishWord,
        streak,
        validateAnswer,
        words
    };
}