import type { NextApiRequest, NextApiResponse } from 'next';

export const errorHandler = (err: unknown, req: NextApiRequest, res: NextApiResponse): void => {
    const {message = 'Unknown error'} = err as Error;

    res.status(404).json({
        message,
        statusCode: 404
    });
};