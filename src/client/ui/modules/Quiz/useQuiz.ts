import type { Word } from "@/client/domain/entities/Word";
import { useEffect, useState } from 'react';
import { makeRndIndexFor, shuffleArray } from "@/client/ui/utils";
import { useHistory } from "@/client/ui/modules/History/useHistory";
import { useGetUserSettings } from "@/client/application/useCases/useGetUserSettings";
import { useSession } from "next-auth/react";

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
    const { data: session } = useSession();
    const { orderedTranslations: words, isLoading: isWordsLoading } = useHistory()
    const { userSettings, isLoading: isLangsLoading } = useGetUserSettings(session?.user?.email as string);
    const langs = userSettings?.data?.userLangs ?? [];

    const [randomWord, setRandomWord] = useState<Word | null>(null);
    const [randomLang, setRandomLang] = useState<string | null>(null);
    const [streak, setStreak] = useState<number>(0);

    const isLoading = !langs || !words || isLangsLoading || isWordsLoading;

    useEffect(() => {
        const randomWordIndex = makeRndIndexFor(words);
        const randomLangIndex = makeRndIndexFor(langs);
        setRandomWord(words[randomWordIndex]);
        setRandomLang(langs[randomLangIndex]);
    }, [streak, isLoading]);

    const englishWord = randomWord?.translations.find(translation => translation.lang === 'en')?.lingo ?? null;
    const targetWord = randomWord?.translations.find(translation => translation.lang === randomLang)?.lingo ?? null;
    const options = [
        targetWord,
        ...words
            .filter(word => word !== randomWord)
            .map(word => word.translations.find(translation => translation.lang === randomLang)?.lingo)
            .filter(translation => translation !== undefined)
            .slice(0, 3)
    ];

    const validateAnswer = (answer: string) => {
        if (answer === targetWord) {
            setStreak(prevStreak => prevStreak + 1);
            console.log('nice!!');
        } else {
            setStreak(0);
            console.log('wooops!!', answer === targetWord);
        }
    };

    return {
        isLoading,
        options: shuffleArray(options),
        randomLang,
        randomWord: englishWord,
        streak,
        validateAnswer,
        words
    };
}