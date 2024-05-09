import { NextApiRequest } from "next";

export interface AuthPayload {
    apiKey?: string;
    user?: any;
}

export type AuthenticatedApiRequest = NextApiRequest & AuthPayload & {files?: Record<string, File[]>};