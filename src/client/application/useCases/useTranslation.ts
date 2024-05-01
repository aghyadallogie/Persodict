import useSWRMutation from "swr/mutation";
import WordsService from "../services/WordsService";

export const useTranslation = () => {
  const { isMutating, trigger } = useSWRMutation(
    "/api/words",
    WordsService.makeTranslation
  );

  return {
    isLoading: isMutating,
    makeTranslation: trigger,
  };
};
