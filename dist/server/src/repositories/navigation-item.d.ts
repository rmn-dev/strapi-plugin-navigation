import { Core } from '@strapi/strapi';
import { NavigationItemDBSchema } from '../schemas';
type NavigationItemRemoveMinimal = Partial<NavigationItemDBSchema> & Pick<NavigationItemDBSchema, 'documentId'>;
interface FindInput {
    filters: any;
    locale?: string;
    limit?: number;
    populate?: any;
    order?: Record<string, 'asc' | 'desc'>[];
}
interface SaveInput {
    item: (Partial<NavigationItemDBSchema> & {
        documentId: undefined;
    }) | ({
        documentId: string;
    } & Partial<Omit<NavigationItemDBSchema, 'documentId'>>);
    locale?: string;
}
export declare const getNavigationItemRepository: (context: {
    strapi: Core.Strapi;
}) => {
    save({ item, locale }: SaveInput): Promise<import("@strapi/types/dist/modules/documents").AnyDocument | null>;
    find({ filters, locale, limit, order, populate }: FindInput): Promise<NavigationItemDBSchema[]>;
    findV4({ filters, locale, limit, order, populate }: FindInput): import("@strapi/types/dist/modules/documents/result/document-engine").FindMany<any, {
        readonly filters: any;
        readonly locale: string | undefined;
        readonly limit: number | undefined;
        readonly populate: any;
        readonly orderBy: Record<string, "asc" | "desc">[] | undefined;
    }>;
    count(where: any): Promise<number>;
    remove(item: NavigationItemRemoveMinimal): import("@strapi/types/dist/modules/documents/result/document-engine").Delete<any, {
        readonly documentId: string;
        readonly populate: "*";
    }>;
    removeForIds(ids: string[]): import("@strapi/types/dist/modules/documents/result/document-engine").Delete<any, {
        readonly documentId: string;
        readonly populate: "*";
    }>[];
    findForMasterIds(ids: number[]): Promise<NavigationItemDBSchema[]>;
};
export declare const removeSensitiveFields: ({ related, items, ...item }: NavigationItemDBSchema) => NavigationItemDBSchema;
export declare const flattenRelated: ({ related, ...item }: any) => any;
export {};
