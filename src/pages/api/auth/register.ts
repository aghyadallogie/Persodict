import nextConnect from '@/server/utils/nextConnect';
import { errorHandler } from '@/server/utils/errorHandler';
import { AuthController } from '@/server/controllers/AuthController';

export default nextConnect()
    .post(AuthController.register)
    .handler({ onError: errorHandler });
