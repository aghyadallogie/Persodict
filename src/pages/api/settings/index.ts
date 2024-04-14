import {errorHandler} from '../../../server/utils/errorHandler';
import nextConnect from '../../../server/utils/nextConnect';
import {SettingsController} from '../../../server/controllers/SettingsController'; 

export default nextConnect()
    .get(SettingsController.getSettings)
    .post(SettingsController.updateSettings)
    .handler({onError: errorHandler});