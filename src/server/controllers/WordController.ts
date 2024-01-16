import { NextApiRequest, NextApiResponse } from "next";
import { WordService } from "../services/WordService";
import { HTTP_STATUS } from "../utils/httpstatus";

export const Langs = ["it", "fr", "de", "ru"];

export class WordController {
  static async getWords(req: NextApiRequest, res: NextApiResponse) {
    try {
      const words = await WordService.getWords();

      res.send({
        data: words,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
        return {
            message: 'Something went wrong!',
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR
        }
    }
  }

  static async translateWord(req: NextApiRequest, res: NextApiResponse) {    
    try {
      const body = JSON.parse(req.body);
      const translation = await WordService.translateWord(body);

      const translated = await WordService.addWord({
        authorId: body.authorId,
        translation: translation!
      });

      res.send({
        data: translated,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      return {
        error,
        status: HTTP_STATUS.BAD_REQUEST,
      };
    }
  }
}
