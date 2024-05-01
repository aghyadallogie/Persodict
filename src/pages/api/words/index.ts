import nextConnect from '../../../server/utils/nextConnect';
import {errorHandler} from '../../../server/utils/errorHandler';
import {WordController} from '../../../server/controllers/WordController';

export default nextConnect()
    .get(WordController.getWords)
    .post(WordController.translateWord)
    .handler({onError: errorHandler});