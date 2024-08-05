import { useToggleLangCase } from "@/client/application/useCases/useToggleLangCase";

export const useUpdateSettings = (langCode: string, userId: string) => {
  const { toggleLang } = useToggleLangCase({ userId, langCode });

  const handleToggleLang = async () => {    
    await toggleLang({ userId, langCode });
  }

  return { handleUpdateSettings: handleToggleLang };
};