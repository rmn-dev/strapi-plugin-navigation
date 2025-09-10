import { Core } from '@strapi/strapi';
import { CreateNavigationSchema, NavigationDBSchema, UpdateNavigationSchema } from '../schemas';
interface FindInput {
    filters?: any;
    limit?: number;
    locale?: string;
    populate?: any;
    orderBy?: Record<string, string>;
}
interface FindOneInput {
    filters?: any;
    locale?: string;
    populate?: any;
}
export declare const getNavigationRepository: (context: {
    strapi: Core.Strapi;
}) => {
    find({ filters, locale, limit, orderBy, populate }: FindInput): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }[]>;
    findOne({ locale, filters, populate }: FindOneInput): Promise<{
        items: import("../schemas").NavigationItemDBSchema[] | undefined;
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
    }>;
    save(navigation: (CreateNavigationSchema & {
        locale?: string;
        items?: unknown;
    }) | (Omit<UpdateNavigationSchema, 'items'> & {
        items?: never;
    })): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }>;
    remove(navigation: Partial<Pick<NavigationDBSchema, 'documentId'>>): import("@strapi/types/dist/modules/documents/result/document-engine").Delete<any, {
        readonly documentId: string;
    }>;
};
export {};
