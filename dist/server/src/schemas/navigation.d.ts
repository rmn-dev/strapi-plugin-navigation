import * as z from 'zod';
export type AudienceDBSchema = z.infer<typeof audienceDBSchema>;
export declare const audienceDBSchema: z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    name: z.ZodString;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    documentId: string;
    key: string;
}, {
    name: string;
    id: number;
    documentId: string;
    key: string;
}>;
export type NavigationItemType = z.infer<typeof navigationItemType>;
export declare const navigationItemType: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
declare const navigationItemDBBaseSchema: z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
    path: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    slug: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    externalPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    uiRouterKey: z.ZodString;
    menuAttached: z.ZodBoolean;
    order: z.ZodNumber;
    collapsed: z.ZodBoolean;
    related: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, "strip", z.ZodUnknown, z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">, z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">>>>>;
    additionalFields: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>>;
    audience: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        documentId: z.ZodString;
        name: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }, {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }>, "many">, z.ZodNull]>>;
    autoSync: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    id: number;
    documentId: string;
    title: string;
    uiRouterKey: string;
    menuAttached: boolean;
    order: number;
    collapsed: boolean;
    additionalFields?: Record<string, unknown> | null | undefined;
    path?: string | null | undefined;
    audience?: {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }[] | null | undefined;
    slug?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
    autoSync?: boolean | null | undefined;
}, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    id: number;
    documentId: string;
    title: string;
    uiRouterKey: string;
    menuAttached: boolean;
    order: number;
    collapsed: boolean;
    additionalFields?: Record<string, unknown> | null | undefined;
    path?: string | null | undefined;
    audience?: {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }[] | null | undefined;
    slug?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
    autoSync?: boolean | null | undefined;
}>;
export type ReadNavigationItemFromLocaleSchema = z.infer<typeof readNavigationItemFromLocaleSchema>;
export declare const readNavigationItemFromLocaleSchema: z.ZodObject<Pick<Omit<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
    path: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    slug: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    externalPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    uiRouterKey: z.ZodString;
    menuAttached: z.ZodBoolean;
    order: z.ZodNumber;
    collapsed: z.ZodBoolean;
    related: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, "strip", z.ZodUnknown, z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">, z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">>>>>;
    additionalFields: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>>;
    audience: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        documentId: z.ZodString;
        name: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }, {
        name: string;
        id: number;
        documentId: string;
        key: string;
    }>, "many">, z.ZodNull]>>;
    autoSync: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
}, "related">, "path" | "type" | "title" | "externalPath" | "uiRouterKey"> & {
    related: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    title: string;
    uiRouterKey: string;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: unknown;
}, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    title: string;
    uiRouterKey: string;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: unknown;
}>;
export type NavigationItemDBSchema = z.infer<typeof navigationItemDBBaseSchema> & {
    parent?: NavigationItemDBSchema | null;
    items?: NavigationItemsDBSchema;
    master?: NavigationDBSchema;
};
export declare const navigationItemDBSchema: z.ZodType<NavigationItemDBSchema>;
export type NavigationItemsDBSchema = z.infer<typeof navigationItemsDBSchema>;
export declare const navigationItemsDBSchema: z.ZodArray<z.ZodType<NavigationItemDBSchema, z.ZodTypeDef, NavigationItemDBSchema>, "many">;
export type NavigationDBSchema = z.infer<ReturnType<typeof navigationDBSchema>>;
export declare const navigationDBSchema: (withItems: boolean) => z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    locale: z.ZodString;
    visible: z.ZodBoolean;
    items: z.ZodArray<z.ZodType<NavigationItemDBSchema, z.ZodTypeDef, NavigationItemDBSchema>, "many"> | z.ZodOptional<z.ZodArray<z.ZodType<NavigationItemDBSchema, z.ZodTypeDef, NavigationItemDBSchema>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
    documentId: string;
    slug: string;
    locale: string;
    visible: boolean;
    items?: NavigationItemDBSchema[] | undefined;
}, {
    name: string;
    id: number;
    documentId: string;
    slug: string;
    locale: string;
    visible: boolean;
    items?: NavigationItemDBSchema[] | undefined;
}>;
export type CreateNavigationSchema = z.infer<typeof createNavigationSchema>;
export declare const createNavigationSchema: z.ZodObject<Omit<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    locale: z.ZodString;
    visible: z.ZodBoolean;
    items: z.ZodArray<z.ZodType<NavigationItemDBSchema, z.ZodTypeDef, NavigationItemDBSchema>, "many"> | z.ZodOptional<z.ZodArray<z.ZodType<NavigationItemDBSchema, z.ZodTypeDef, NavigationItemDBSchema>, "many">>;
}, "id" | "documentId" | "slug" | "locale" | "items"> & {
    documentId: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodUndefined>;
}, "strip", z.ZodTypeAny, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}>;
export type UpdateNavigationItemSchema = z.ZodType<Omit<z.infer<typeof navigationItemDBSchema>, 'id' | 'documentId' | 'parent' | 'items'>> & {
    items?: UpdateNavigationItemsSchema | null;
    id?: number;
    documentId?: string;
    updated?: boolean;
    removed?: boolean;
};
export declare const updateNavigationItemSchema: UpdateNavigationItemSchema;
export type UpdateNavigationItemsSchema = z.infer<typeof navigationItemsDBSchema>;
export declare const updateNavigationItemsSchema: z.ZodArray<UpdateNavigationItemSchema, "many">;
export type UpdateNavigationSchema = z.infer<typeof updateNavigationSchema>;
export declare const updateNavigationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    id: z.ZodNumber;
    documentId: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    visible: z.ZodOptional<z.ZodBoolean>;
    items: z.ZodOptional<z.ZodArray<UpdateNavigationItemSchema, "many">>;
}, "strip", z.ZodTypeAny, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}>;
export {};
