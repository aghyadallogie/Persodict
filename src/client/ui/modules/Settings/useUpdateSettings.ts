import { useUpdateSettingsCase } from "@/client/application/useCases/useUpdateSettings";

export const useUpdateSettings = (langCode: string, userLangs: string[] = [], userId: string) => {
  const { updateSettings } = useUpdateSettingsCase({userId, userLangs});

  const handleUpdateSettings = async () => {
    let payload;
    if (userLangs.includes(langCode)) {
      userLangs = userLangs.filter((langItem: string) => {
        return langItem !== langCode;
      });
      payload = { userId, userLangs };
    } else {
      userLangs.push(langCode);
      payload = { userId, userLangs };
    }

    await updateSettings(payload);
  };

  return { handleUpdateSettings };
};
