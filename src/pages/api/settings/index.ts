import nextConnect from '../../../server/utils/nextConnect';
import {errorHandler} from '../../../server/utils/errorHandler';
import {SettingsController} from '../../../server/controllers/SettingsController'; 

export default nextConnect()
    .get(SettingsController.getSettings)
    .patch(SettingsController.updateSettings)
    .handler({onError: errorHandler});