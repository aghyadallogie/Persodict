import {WordsAdapter} from "@/client/domain/adapters/WordsAdapter";
import type {UserTranslations, Word} from "@/client/domain/entities/Word";
import type {Lingo} from "@/server/domain/entities/Word";

class WordsService implements WordsAdapter {
  /**
  * Sends a request to create a new translation and returns the translated word.
  *
  * This function performs a POST request to the `/api/words` endpoint with the provided translation data.
  * Throws an error if the request fails.
  *
  * @param {string} key - A unique key identifying the request (unused in this function).
  * @param {Object} param - An object containing the translation argument.
  * @param {Lingo} param.arg - The translation data to be sent in the request body.
  * @returns {Promise<Word>} The translated word returned from the API.
  * @throws {Error} If the API request fails.
  */
  async makeTranslation(
    key: string,
    {arg}: {arg: Lingo}
  ): Promise<Word> {
    const res = await fetch("/api/words", {
      body: JSON.stringify(arg),
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Failed to create translation: ${res.statusText}`);
    }

    const data = (await res.json()) as Word;
    return data;
  }

  /**
   * Fetches user translations from the API with retry logic.
   *
   * This function attempts to fetch translations associated with the specified `authorId`.
   * If the request fails, it retries up to a maximum of three attempts.
   *
   * @param {string} authorId - The ID of the author whose translations are being fetched.
   * @returns {Promise<UserTranslations | undefined>} A promise resolving to the user's translations,
   * or `undefined` if all attempts fail.
   */
  async getUserTranslations(authorId: string): Promise<UserTranslations | undefined> {
    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(`/api/words?authorId=${authorId}`);

        if (!res.ok) {
          throw new Error(`Attempt ${attempt}: Failed to fetch translations: ${res.status}`);
        }

        const data = await res.json();
        return data as UserTranslations;
      } catch (error) {
        console.error(`Attempt ${attempt} failed`, error);

        if (attempt === MAX_RETRIES) {
          console.error("All retries failed");
          return undefined;
        }
      }
    }
    return undefined;
  }

  /**
   * Deletes a word from the API.
   *
   * Sends a DELETE request to the `/api/words/:arg` endpoint to delete a specific word.
   * Returns the response data if successful, or `undefined` if an error occurs.
   *
   * @param {string} key - A unique key identifying the request (unused in this function).
   * @param {Object} param - An object containing the word ID to delete.
   * @param {string} param.arg - The ID of the word to delete.
   * @returns {Promise<string | undefined>} A promise resolving to the response data as a string, or `undefined` if the request fails.
   */
  async deleteWord(
    key: string,
    {arg}: {arg: string}
  ): Promise<string | undefined> {
    try {
      const res = await fetch(`/api/words/${arg}`, {method: "DELETE"});

      if (!res.ok) {
        throw new Error(`Failed to delete word: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error deleting word:", error);
      return undefined;
    }
  }
}

export default new WordsService();