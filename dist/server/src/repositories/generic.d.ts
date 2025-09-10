import { Core, UID } from '@strapi/strapi';
type PublicationStatus = 'published' | 'draft';
export declare const getGenericRepository: (context: {
    strapi: Core.Strapi;
}, uid: UID.ContentType) => {
    findFirst(populate: any, status?: PublicationStatus, extra?: any): import("@strapi/types/dist/modules/documents/result/document-engine").FindFirst<UID.ContentType, any>;
    findById(documentId: string, populate: any, status?: PublicationStatus, extra?: any): import("@strapi/types/dist/modules/documents/result/document-engine").FindOne<UID.ContentType, any>;
    findManyById(documentIds: string[], populate: any, status?: PublicationStatus): import("@strapi/types/dist/modules/documents/result/document-engine").FindMany<UID.ContentType, {
        readonly where: {
            readonly documentId: {
                readonly $in: string[];
            };
        };
        readonly populate: any;
        readonly status: PublicationStatus | undefined;
    }>;
    findMany(where: any, populate: any, status?: PublicationStatus, locale?: string): import("@strapi/types/dist/modules/documents/result/document-engine").FindMany<UID.ContentType, {
        readonly where: any;
        readonly populate: any;
        readonly status: PublicationStatus | undefined;
        readonly locale: string | undefined;
    }>;
    count(where: Record<string, any>, status?: PublicationStatus): import("@strapi/types/dist/modules/documents/result/document-engine").Count;
};
export {};
