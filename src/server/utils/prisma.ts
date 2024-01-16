import {PrismaClient} from '@prisma/client';

if (!global.prisma) {
    process.stdout.write('Creating new prisma client\n');
    global.prisma = new PrismaClient();
}

// eslint-disable-next-line prefer-destructuring
export const prisma = global.prisma as PrismaClient;