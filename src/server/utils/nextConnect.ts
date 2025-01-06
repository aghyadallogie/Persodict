import { createRouter } from 'next-connect';

import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Creates a Next.js API route handler using next-connect.
 *
 * @returns {import('next-connect').NextConnect<NextApiRequest, NextApiResponse>} The router instance for handling API requests.
 */
const nextConnect = () => {
    const router = createRouter<NextApiRequest, NextApiResponse>();

    return router;
};

export default nextConnect;