import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import WordsService from "@/client/application/services/WordsService";

const isWordsKey = (key: unknown) => typeof key === "string" && key.startsWith("/api/words");

export const useTranslation = () => {
  const { isMutating, trigger } = useSWRMutation(
    "/api/words",
    WordsService.makeTranslation,
    { onSuccess: () => mutate(isWordsKey) }
  );

  return {
    isLoading: isMutating,
    makeTranslation: trigger,
  };
};