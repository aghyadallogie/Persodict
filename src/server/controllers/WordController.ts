import { WordService } from "../services/WordService";
import { HTTP_STATUS } from "../utils/httpstatus";

import type { Lingo } from "../domain/entities/Word";
import type { NextApiRequest, NextApiResponse } from "next";

export class WordController {
  static async getWords(req: NextApiRequest, res: NextApiResponse) {
    try {
      const words = await WordService.getWords(req.query.authorId as string);

      return res.send({
        data: words,
        status: HTTP_STATUS.OK,
      });
    } catch (error) {
      return {
        message: "Something went wrong!",
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }
  }

  static async translateWord(req: NextApiRequest, res: NextApiResponse) {
    try {
      const body = JSON.parse(req.body as string) as Lingo;

      const translation = await WordService.translateWord(body);
      const translated = await WordService.addWord({
        authorId: body.authorId,
        translations: translation!,
      });

      return res.send({
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

  static async deleteWord(req: NextApiRequest, res: NextApiResponse) {
    try {
      const deleted = await WordService.deleteWord(req.query.wordId as string);

      return res.send({
        data: deleted?.id,
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
