import {createRouter} from 'next-connect';

import type {NextApiRequest, NextApiResponse} from 'next';

/**
 * NextConnect with middleware to automatically connect to mongodb.
 *
 * @returns NextConnect with middleware.
 */
const nextConnect = () => {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    return router;
};

export default nextConnect;