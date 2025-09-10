import { Core } from '@strapi/strapi';
export declare const getAudienceRepository: (context: {
    strapi: Core.Strapi;
}) => {
    find(where: Record<string, unknown>, limit?: number): Promise<{
        name: string;
        id: number;
        documentId: string;
        key: string;
    }[]>;
};
