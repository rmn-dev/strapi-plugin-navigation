import { getFetchClient } from '@strapi/strapi/admin';
import { NavigationPluginConfigSchema, NavigationSchema } from './validators';
export type ApiClient = ReturnType<typeof getApiClient>;
export declare const getApiClient: (fetch: ReturnType<typeof getFetchClient>) => {
    getIndexPrefix(): string[];
    readAll(): Promise<{
        id: number;
        name: string;
        documentId: string;
        items: import("./validators").NavigationItemSchema[];
        slug: string;
        locale: string;
        visible: boolean;
    }[]>;
    readAllIndex(): string[];
    delete(documentId: string): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    create(body: Omit<NavigationSchema, 'documentId' | 'id' | 'slug'>): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    update(body: NavigationSchema): Promise<{
        id: number;
        name: string;
        documentId: string;
        items: import("./validators").NavigationItemSchema[];
        slug: string;
        locale: string;
        visible: boolean;
    }>;
    purge({ documentId, withLangVersions }: {
        documentId?: string;
        withLangVersions?: boolean;
    }): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    slugify(query: string): Promise<string>;
    readConfig(): Promise<{
        additionalFields: ("audience" | {
            name: string;
            type: "string" | "boolean";
            label: string;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            options?: string[] | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            name: string;
            type: "media";
            label: string;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            options?: string[] | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            name: string;
            type: "select";
            label: string;
            options: string[];
            multi: boolean;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
        })[];
        allowedLevels: number;
        availableAudience: {
            id: number;
            name: string;
            key: string;
            documentId: string;
        }[];
        contentTypes: {
            name: string;
            label: string;
            description: string;
            visible: boolean;
            uid: string;
            draftAndPublish: boolean;
            isSingle: boolean;
            collectionName: string;
            contentTypeName: string;
            labelSingular: string;
            endpoint: string;
            available: boolean;
        }[];
        contentTypesNameFields: Record<string, string[]>;
        contentTypesPopulate: Record<string, string[]>;
        gql: {
            navigationItemRelated: string[];
        };
        pathDefaultFields: Record<string, string[]>;
        cascadeMenuAttached: boolean;
        preferCustomContentTypes: boolean;
        allowedContentTypes: string[];
        restrictedContentTypes: string[];
        defaultContentType?: string | undefined;
        isCacheEnabled?: boolean | undefined;
        isCachePluginEnabled?: boolean | undefined;
    }>;
    readConfigIndex(): string[];
    healthCheck(): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    healthCheckIndex(): string[];
    readNavigationItemFromLocale({ source, structureId, target, documentId, }: {
        source: string;
        target: string;
        documentId: string;
        structureId: string;
    }): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    updateConfig(body: Omit<NavigationPluginConfigSchema, 'restrictedContentTypes' | 'allowedContentTypes'>): Promise<void>;
    restart(): Promise<void>;
    restoreConfig(): Promise<void>;
    readSettingsConfig(): Promise<{
        contentTypes: string[];
        additionalFields: ("audience" | {
            name: string;
            type: "string" | "boolean";
            label: string;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            options?: string[] | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            name: string;
            type: "media";
            label: string;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            options?: string[] | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            name: string;
            type: "select";
            label: string;
            options: string[];
            multi: boolean;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            description?: string | undefined;
            enabled?: boolean | undefined;
        })[];
        allowedLevels: number;
        availableAudience: {
            id: number;
            name: string;
            key: string;
            documentId: string;
        }[];
        contentTypesNameFields: Record<string, string[]>;
        contentTypesPopulate: Record<string, string[]>;
        gql: {
            navigationItemRelated: string[];
        };
        pathDefaultFields: Record<string, string[]>;
        cascadeMenuAttached: boolean;
        preferCustomContentTypes: boolean;
        allowedContentTypes: string[];
        restrictedContentTypes: string[];
        defaultContentType?: string | undefined;
        isCacheEnabled?: boolean | undefined;
        isCachePluginEnabled?: boolean | undefined;
    }>;
    readSettingsConfigIndex(): string[];
    readContentType(): Promise<{
        kind: "collectionType" | "singleType";
        uid: string;
        info: {
            displayName: string;
            singularName: string;
            pluralName: string;
            description?: string | undefined;
        };
        attributes: Record<string, unknown>;
        isDisplayed: boolean;
        apiID: string;
    }[]>;
    readContentTypeIndex(): string[];
    readContentTypeItems({ uid, locale, query }: {
        uid: string;
        locale?: string;
        query?: string;
    }): Promise<({
        id: number;
        documentId: string;
        locale?: string | null | undefined;
    } & Record<string, any>)[]>;
    readContentTypeItemsIndex({ uid, locale, query, }: {
        uid: string;
        locale?: string;
        query?: string;
    }): (string | undefined)[];
    readLocale(): Promise<{
        defaultLocale: string;
        restLocale: string[];
    }>;
    readLocaleIndex(): string[];
    copyNavigationLocale({ documentId, source, target, }: {
        source: string;
        target: string;
        documentId: string;
    }): Promise<import("@strapi/strapi/admin").FetchResponse<any>>;
    copyNavigationItemLocale({ source, structureId, target, }: {
        source: string;
        target: string;
        structureId?: string;
    }): Promise<{
        type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
        title: string;
        uiRouterKey: string;
        path?: string | null | undefined;
        externalPath?: string | null | undefined;
        related?: import("zod").objectOutputType<{
            documentId: import("zod").ZodOptional<import("zod").ZodString>;
            __type: import("zod").ZodString;
        }, import("zod").ZodUnknown, "strip"> | null | undefined;
    }>;
};
