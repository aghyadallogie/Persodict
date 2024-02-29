import {WordController} from '../../../server/controllers/WordController';
import {errorHandler} from '../../../server/utils/errorHandler';
import nextConnect from '../../../server/utils/nextConnect';


export default nextConnect()
    .delete(WordController.deleteWord)
    .handler({onError: errorHandler});