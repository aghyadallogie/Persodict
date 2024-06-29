/// <reference types="node" />
/// <reference types="@prisma/client" />
// eslint-disable-next-line no-underscore-dangle, no-var
declare var __coverage__: boolean | string | null | undefined;

// eslint-disable-next-line no-var, no-undef
declare var prisma: PrismaClient;
declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
        FEATURE_ENV: string;
    }
}