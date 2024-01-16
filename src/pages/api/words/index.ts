import { WordController } from "@/server/controllers/WordController";
import { errorHandler } from "@/server/utils/errorHandler";
import nextConnect from "@/server/utils/nextConnect";

export default nextConnect()
    .get(WordController.getWords)
    .post(WordController.translateWord)
    .handler({onError: errorHandler});