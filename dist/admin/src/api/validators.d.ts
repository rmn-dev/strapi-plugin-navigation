import * as z from 'zod';
export type NavigationPluginConfigSchema = z.infer<typeof configSchema>;
export type AudienceDBSchema = z.infer<typeof audienceDBSchema>;
export declare const audienceDBSchema: z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    name: z.ZodString;
    key: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    key: string;
    documentId: string;
}, {
    id: number;
    name: string;
    key: string;
    documentId: string;
}>;
export type NavigationItemTypeSchema = z.infer<typeof navigationItemTypeSchema>;
export declare const navigationItemTypeSchema: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
declare const navigationItemBaseSchema: z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    title: z.ZodString;
    type: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
    path: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    externalPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    uiRouterKey: z.ZodString;
    menuAttached: z.ZodBoolean;
    order: z.ZodNumber;
    collapsed: z.ZodBoolean;
    autoSync: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodNull]>>;
    related: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, "strip", z.ZodUnknown, z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">, z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">>>>;
    additionalFields: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodUnknown>, z.ZodNull]>>;
    audience: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        documentId: z.ZodString;
        name: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }>, "many">, z.ZodNull]>>;
    viewId: z.ZodOptional<z.ZodNumber>;
    viewParentId: z.ZodOptional<z.ZodNumber>;
    structureId: z.ZodOptional<z.ZodString>;
    removed: z.ZodOptional<z.ZodBoolean>;
    isSearchActive: z.ZodOptional<z.ZodBoolean>;
    updated: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: number;
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    order: number;
    title: string;
    documentId: string;
    uiRouterKey: string;
    menuAttached: boolean;
    collapsed: boolean;
    path?: string | null | undefined;
    additionalFields?: Record<string, unknown> | null | undefined;
    audience?: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[] | null | undefined;
    externalPath?: string | null | undefined;
    autoSync?: boolean | null | undefined;
    related?: z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
    viewId?: number | undefined;
    viewParentId?: number | undefined;
    structureId?: string | undefined;
    removed?: boolean | undefined;
    isSearchActive?: boolean | undefined;
    updated?: boolean | undefined;
}, {
    id: number;
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    order: number;
    title: string;
    documentId: string;
    uiRouterKey: string;
    menuAttached: boolean;
    collapsed: boolean;
    path?: string | null | undefined;
    additionalFields?: Record<string, unknown> | null | undefined;
    audience?: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[] | null | undefined;
    externalPath?: string | null | undefined;
    autoSync?: boolean | null | undefined;
    related?: z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
    viewId?: number | undefined;
    viewParentId?: number | undefined;
    structureId?: string | undefined;
    removed?: boolean | undefined;
    isSearchActive?: boolean | undefined;
    updated?: boolean | undefined;
}>;
export type NavigationItemSchema = z.infer<typeof navigationItemBaseSchema> & {
    items?: NavigationItemSchema[] | null;
};
export declare const navigationItemSchema: z.ZodType<NavigationItemSchema>;
export type NavigationSchema = z.infer<typeof navigationSchema>;
export declare const navigationSchema: z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    locale: z.ZodString;
    visible: z.ZodBoolean;
    items: z.ZodArray<z.ZodType<NavigationItemSchema, z.ZodTypeDef, NavigationItemSchema>, "many">;
}, "strip", z.ZodTypeAny, {
    id: number;
    name: string;
    documentId: string;
    items: NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}, {
    id: number;
    name: string;
    documentId: string;
    items: NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}>;
export type NavigationItemCustomFieldSelect = z.infer<typeof navigationItemCustomFieldSelect>;
declare const navigationItemCustomFieldSelect: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"select">;
    multi: z.ZodBoolean;
    options: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}>;
export type NavigationItemCustomFieldPrimitive = z.infer<typeof navigationItemCustomFieldPrimitive>;
declare const navigationItemCustomFieldPrimitive: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodEnum<["boolean", "string"]>;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>;
export type NavigationItemCustomFieldMedia = z.infer<typeof navigationItemCustomFieldMedia>;
declare const navigationItemCustomFieldMedia: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"media">;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>;
export type NavigationItemCustomField = z.infer<typeof navigationItemCustomField>;
export declare const navigationItemCustomField: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodEnum<["boolean", "string"]>;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"media">;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"select">;
    multi: z.ZodBoolean;
    options: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}>]>;
export type NavigationItemAdditionalField = z.infer<typeof navigationItemAdditionalField>;
export declare const navigationItemAdditionalField: z.ZodUnion<[z.ZodLiteral<"audience">, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodEnum<["boolean", "string"]>;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "string" | "boolean";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"media">;
    multi: z.ZodOptional<z.ZodLiteral<false>>;
    options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    name: string;
    type: "media";
    label: string;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    options?: string[] | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
} & {
    type: z.ZodLiteral<"select">;
    multi: z.ZodBoolean;
    options: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}, {
    name: string;
    type: "select";
    label: string;
    options: string[];
    multi: boolean;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    description?: string | undefined;
    enabled?: boolean | undefined;
}>]>]>;
export declare const configContentTypeSchema: z.ZodObject<{
    uid: z.ZodString;
    name: z.ZodString;
    draftAndPublish: z.ZodBoolean;
    isSingle: z.ZodBoolean;
    description: z.ZodString;
    collectionName: z.ZodString;
    contentTypeName: z.ZodString;
    label: z.ZodString;
    labelSingular: z.ZodString;
    endpoint: z.ZodString;
    available: z.ZodBoolean;
    visible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export declare const configSchema: z.ZodObject<{
    additionalFields: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"audience">, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodEnum<["boolean", "string"]>;
        multi: z.ZodOptional<z.ZodLiteral<false>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "string" | "boolean";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        name: string;
        type: "string" | "boolean";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodLiteral<"media">;
        multi: z.ZodOptional<z.ZodLiteral<false>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "media";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        name: string;
        type: "media";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodLiteral<"select">;
        multi: z.ZodBoolean;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    }, {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    }>]>]>, "many">;
    allowedLevels: z.ZodNumber;
    availableAudience: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        documentId: z.ZodString;
        name: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }>, "many">;
    contentTypes: z.ZodArray<z.ZodString, "many">;
    defaultContentType: z.ZodOptional<z.ZodString>;
    contentTypesNameFields: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    contentTypesPopulate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    gql: z.ZodObject<{
        navigationItemRelated: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        navigationItemRelated: string[];
    }, {
        navigationItemRelated: string[];
    }>;
    pathDefaultFields: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    cascadeMenuAttached: z.ZodBoolean;
    preferCustomContentTypes: z.ZodBoolean;
    allowedContentTypes: z.ZodArray<z.ZodString, "many">;
    restrictedContentTypes: z.ZodArray<z.ZodString, "many">;
    isCacheEnabled: z.ZodOptional<z.ZodBoolean>;
    isCachePluginEnabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
    contentTypes: string[];
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
}, {
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
    contentTypes: string[];
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
export type ConfigFromServerSchema = z.infer<typeof configFromServerSchema>;
export declare const configFromServerSchema: z.ZodObject<Omit<{
    additionalFields: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"audience">, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodEnum<["boolean", "string"]>;
        multi: z.ZodOptional<z.ZodLiteral<false>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "string" | "boolean";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        name: string;
        type: "string" | "boolean";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodLiteral<"media">;
        multi: z.ZodOptional<z.ZodLiteral<false>>;
        options: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "media";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        name: string;
        type: "media";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, z.ZodObject<{
        name: z.ZodEffects<z.ZodString, string, string>;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        placeholder: z.ZodOptional<z.ZodString>;
        required: z.ZodOptional<z.ZodBoolean>;
        enabled: z.ZodOptional<z.ZodBoolean>;
    } & {
        type: z.ZodLiteral<"select">;
        multi: z.ZodBoolean;
        options: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    }, {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    }>]>]>, "many">;
    allowedLevels: z.ZodNumber;
    availableAudience: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        documentId: z.ZodString;
        name: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }, {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }>, "many">;
    contentTypes: z.ZodArray<z.ZodString, "many">;
    defaultContentType: z.ZodOptional<z.ZodString>;
    contentTypesNameFields: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    contentTypesPopulate: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    gql: z.ZodObject<{
        navigationItemRelated: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        navigationItemRelated: string[];
    }, {
        navigationItemRelated: string[];
    }>;
    pathDefaultFields: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString, "many">>;
    cascadeMenuAttached: z.ZodBoolean;
    preferCustomContentTypes: z.ZodBoolean;
    allowedContentTypes: z.ZodArray<z.ZodString, "many">;
    restrictedContentTypes: z.ZodArray<z.ZodString, "many">;
    isCacheEnabled: z.ZodOptional<z.ZodBoolean>;
    isCachePluginEnabled: z.ZodOptional<z.ZodBoolean>;
}, "contentTypes"> & {
    contentTypes: z.ZodArray<z.ZodObject<{
        uid: z.ZodString;
        name: z.ZodString;
        draftAndPublish: z.ZodBoolean;
        isSingle: z.ZodBoolean;
        description: z.ZodString;
        collectionName: z.ZodString;
        contentTypeName: z.ZodString;
        label: z.ZodString;
        labelSingular: z.ZodString;
        endpoint: z.ZodString;
        available: z.ZodBoolean;
        visible: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export declare const localeSchema: z.ZodObject<{
    defaultLocale: z.ZodString;
    restLocale: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    defaultLocale: string;
    restLocale: string[];
}, {
    defaultLocale: string;
    restLocale: string[];
}>;
export type ContentType = z.infer<typeof contentType>;
export declare const contentType: z.ZodEnum<["collectionType", "singleType"]>;
export type ContentTypeInfo = z.infer<typeof contentTypeInfo>;
export declare const contentTypeInfo: z.ZodObject<{
    singularName: z.ZodString;
    pluralName: z.ZodString;
    displayName: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    displayName: string;
    singularName: string;
    pluralName: string;
    name?: string | undefined;
    description?: string | undefined;
}, {
    displayName: string;
    singularName: string;
    pluralName: string;
    name?: string | undefined;
    description?: string | undefined;
}>;
export type ContentTypeAttributeValidator = z.infer<typeof contentTypeAttributeValidator>;
export declare const contentTypeAttributeValidator: z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    max: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    private: z.ZodOptional<z.ZodBoolean>;
    configurable: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}, {
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}>;
export type contentTypeFieldTypeSchema = z.infer<typeof contentTypeFieldTypeSchema>;
export declare const contentTypeFieldTypeSchema: z.ZodEnum<["string", "text", "richtext", "blocks", "email", "password", "date", "time", "datetime", "timestamp", "boolean", "integer", "biginteger", "float", "decimal", "json", "relation", "media"]>;
export type SimpleContentTypeAttribute = z.infer<typeof simpleContentTypeAttribute>;
export declare const simpleContentTypeAttribute: z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    max: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    private: z.ZodOptional<z.ZodBoolean>;
    configurable: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodEnum<["string", "text", "richtext", "blocks", "email", "password", "date", "time", "datetime", "timestamp", "boolean", "integer", "biginteger", "float", "decimal", "json", "relation", "media"]>;
}, "strip", z.ZodTypeAny, {
    type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}, {
    type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}>;
export type ContentTypeEnumerationAttribute = z.infer<typeof contentTypeEnumerationAttribute>;
export declare const contentTypeEnumerationAttribute: z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    max: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    private: z.ZodOptional<z.ZodBoolean>;
    configurable: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"enumeration">;
    enum: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "enumeration";
    enum: string[];
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}, {
    type: "enumeration";
    enum: string[];
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}>;
export type ContentTypeComponentAttribute = z.infer<typeof contentTypeComponentAttribute>;
export declare const contentTypeComponentAttribute: z.ZodObject<{
    type: z.ZodLiteral<"component">;
    component: z.ZodString;
    repeatable: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "component";
    component: string;
    repeatable?: boolean | undefined;
}, {
    type: "component";
    component: string;
    repeatable?: boolean | undefined;
}>;
export type ContentTypeDynamicZoneAttribute = z.infer<typeof contentTypeDynamicZoneAttribute>;
export declare const contentTypeDynamicZoneAttribute: z.ZodObject<{
    type: z.ZodLiteral<"dynamiczone">;
    components: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "dynamiczone";
    components: string[];
}, {
    type: "dynamiczone";
    components: string[];
}>;
export type ContentTypeMediaAttribute = z.infer<typeof contentTypeMediaAttribute>;
export declare const contentTypeMediaAttribute: z.ZodObject<{
    media: z.ZodLiteral<"media">;
    allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    media: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}, {
    media: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}>;
export type ContentTypeRelationType = z.infer<typeof contentTypeRelationType>;
export declare const contentTypeRelationType: z.ZodEnum<["oneToOne", "oneToMany", "manyToOne", "manyToMany", "morphToMany", "manyToMorph"]>;
export type ContentTypeRelationAttribute = z.infer<typeof contentTypeRelationAttribute>;
export declare const contentTypeRelationAttribute: z.ZodObject<{
    type: z.ZodLiteral<"relation">;
    relation: z.ZodEnum<["oneToOne", "oneToMany", "manyToOne", "manyToMany", "morphToMany", "manyToMorph"]>;
    target: z.ZodString;
    mappedBy: z.ZodOptional<z.ZodString>;
    inversedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    target: string;
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}, {
    target: string;
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}>;
export type ContentTypeAttributes = z.infer<typeof contentTypeAttributes>;
export declare const contentTypeAttributes: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    max: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    private: z.ZodOptional<z.ZodBoolean>;
    configurable: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodEnum<["string", "text", "richtext", "blocks", "email", "password", "date", "time", "datetime", "timestamp", "boolean", "integer", "biginteger", "float", "decimal", "json", "relation", "media"]>;
}, "strip", z.ZodTypeAny, {
    type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}, {
    type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}>, z.ZodObject<{
    required: z.ZodOptional<z.ZodBoolean>;
    max: z.ZodOptional<z.ZodNumber>;
    min: z.ZodOptional<z.ZodNumber>;
    minLength: z.ZodOptional<z.ZodNumber>;
    maxLength: z.ZodOptional<z.ZodNumber>;
    private: z.ZodOptional<z.ZodBoolean>;
    configurable: z.ZodOptional<z.ZodBoolean>;
    default: z.ZodOptional<z.ZodAny>;
} & {
    type: z.ZodLiteral<"enumeration">;
    enum: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "enumeration";
    enum: string[];
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}, {
    type: "enumeration";
    enum: string[];
    max?: number | undefined;
    min?: number | undefined;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    required?: boolean | undefined;
    default?: any;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"component">;
    component: z.ZodString;
    repeatable: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "component";
    component: string;
    repeatable?: boolean | undefined;
}, {
    type: "component";
    component: string;
    repeatable?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"dynamiczone">;
    components: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "dynamiczone";
    components: string[];
}, {
    type: "dynamiczone";
    components: string[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"relation">;
    relation: z.ZodEnum<["oneToOne", "oneToMany", "manyToOne", "manyToMany", "morphToMany", "manyToMorph"]>;
    target: z.ZodString;
    mappedBy: z.ZodOptional<z.ZodString>;
    inversedBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    target: string;
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}, {
    target: string;
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}>, z.ZodObject<{
    media: z.ZodLiteral<"media">;
    allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    media: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}, {
    media: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}>]>>;
export type ContentTypeFullSchema = z.infer<typeof contentTypeFullSchema>;
export declare const contentTypeFullSchema: z.ZodObject<{
    kind: z.ZodEnum<["collectionType", "singleType"]>;
    collectionName: z.ZodString;
    info: z.ZodObject<{
        singularName: z.ZodString;
        pluralName: z.ZodString;
        displayName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    }, {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    }>;
    options: z.ZodOptional<z.ZodObject<{
        draftAndPublish: z.ZodOptional<z.ZodBoolean>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        templateName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    }, {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    }>>;
    attributes: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        max: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        private: z.ZodOptional<z.ZodBoolean>;
        configurable: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodEnum<["string", "text", "richtext", "blocks", "email", "password", "date", "time", "datetime", "timestamp", "boolean", "integer", "biginteger", "float", "decimal", "json", "relation", "media"]>;
    }, "strip", z.ZodTypeAny, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }>, z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        max: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        private: z.ZodOptional<z.ZodBoolean>;
        configurable: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"enumeration">;
        enum: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }, {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"component">;
        component: z.ZodString;
        repeatable: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    }, {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"dynamiczone">;
        components: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "dynamiczone";
        components: string[];
    }, {
        type: "dynamiczone";
        components: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"relation">;
        relation: z.ZodEnum<["oneToOne", "oneToMany", "manyToOne", "manyToMany", "morphToMany", "manyToMorph"]>;
        target: z.ZodString;
        mappedBy: z.ZodOptional<z.ZodString>;
        inversedBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }, {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>, z.ZodObject<{
        media: z.ZodLiteral<"media">;
        allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }, {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }>]>>;
    actions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    lifecycles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    uid: z.ZodString;
    apiName: z.ZodOptional<z.ZodString>;
    associations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        model: z.ZodString;
        alias: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model: string;
        alias: string;
    }, {
        model: string;
        alias: string;
    }>, "many">>;
    modelName: z.ZodOptional<z.ZodString>;
    plugin: z.ZodOptional<z.ZodString>;
    pluginOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    isSingle: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    kind: "collectionType" | "singleType";
    uid: string;
    collectionName: string;
    info: {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
    isSingle?: boolean | undefined;
    actions?: Record<string, any> | undefined;
    lifecycles?: Record<string, any> | undefined;
    apiName?: string | undefined;
    associations?: {
        model: string;
        alias: string;
    }[] | undefined;
    modelName?: string | undefined;
    plugin?: string | undefined;
    pluginOptions?: Record<string, any> | undefined;
}, {
    kind: "collectionType" | "singleType";
    uid: string;
    collectionName: string;
    info: {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
    isSingle?: boolean | undefined;
    actions?: Record<string, any> | undefined;
    lifecycles?: Record<string, any> | undefined;
    apiName?: string | undefined;
    associations?: {
        model: string;
        alias: string;
    }[] | undefined;
    modelName?: string | undefined;
    plugin?: string | undefined;
    pluginOptions?: Record<string, any> | undefined;
}>;
export type ContentTypeSchema = z.infer<typeof contentTypeFullSchema>;
export declare const contentTypeSchema: z.ZodObject<Pick<{
    kind: z.ZodEnum<["collectionType", "singleType"]>;
    collectionName: z.ZodString;
    info: z.ZodObject<{
        singularName: z.ZodString;
        pluralName: z.ZodString;
        displayName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    }, {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    }>;
    options: z.ZodOptional<z.ZodObject<{
        draftAndPublish: z.ZodOptional<z.ZodBoolean>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        templateName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    }, {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    }>>;
    attributes: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        max: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        private: z.ZodOptional<z.ZodBoolean>;
        configurable: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodEnum<["string", "text", "richtext", "blocks", "email", "password", "date", "time", "datetime", "timestamp", "boolean", "integer", "biginteger", "float", "decimal", "json", "relation", "media"]>;
    }, "strip", z.ZodTypeAny, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }>, z.ZodObject<{
        required: z.ZodOptional<z.ZodBoolean>;
        max: z.ZodOptional<z.ZodNumber>;
        min: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        private: z.ZodOptional<z.ZodBoolean>;
        configurable: z.ZodOptional<z.ZodBoolean>;
        default: z.ZodOptional<z.ZodAny>;
    } & {
        type: z.ZodLiteral<"enumeration">;
        enum: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }, {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"component">;
        component: z.ZodString;
        repeatable: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    }, {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"dynamiczone">;
        components: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "dynamiczone";
        components: string[];
    }, {
        type: "dynamiczone";
        components: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"relation">;
        relation: z.ZodEnum<["oneToOne", "oneToMany", "manyToOne", "manyToMany", "morphToMany", "manyToMorph"]>;
        target: z.ZodString;
        mappedBy: z.ZodOptional<z.ZodString>;
        inversedBy: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }, {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>, z.ZodObject<{
        media: z.ZodLiteral<"media">;
        allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }, {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }>]>>;
    actions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    lifecycles: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    uid: z.ZodString;
    apiName: z.ZodOptional<z.ZodString>;
    associations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        model: z.ZodString;
        alias: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        model: string;
        alias: string;
    }, {
        model: string;
        alias: string;
    }>, "many">>;
    modelName: z.ZodOptional<z.ZodString>;
    plugin: z.ZodOptional<z.ZodString>;
    pluginOptions: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    isSingle: z.ZodOptional<z.ZodBoolean>;
}, "kind" | "options" | "info" | "attributes">, "strip", z.ZodTypeAny, {
    kind: "collectionType" | "singleType";
    info: {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
}, {
    kind: "collectionType" | "singleType";
    info: {
        displayName: string;
        singularName: string;
        pluralName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "media" | "time" | "text" | "integer" | "float" | "date" | "richtext" | "blocks" | "email" | "password" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "enumeration";
        enum: string[];
        max?: number | undefined;
        min?: number | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        required?: boolean | undefined;
        default?: any;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        media: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        target: string;
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        hidden?: boolean | undefined;
        draftAndPublish?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
}>;
export type StrapiContentTypeItemSchema = z.infer<typeof strapiContentTypeItemSchema>;
export declare const strapiContentTypeItemSchema: z.ZodIntersection<z.ZodObject<{
    id: z.ZodNumber;
    documentId: z.ZodString;
    locale: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
}, "strip", z.ZodTypeAny, {
    id: number;
    documentId: string;
    locale?: string | null | undefined;
}, {
    id: number;
    documentId: string;
    locale?: string | null | undefined;
}>, z.ZodRecord<z.ZodString, z.ZodAny>>;
export declare const slugifyResult: z.ZodObject<{
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    slug: string;
}, {
    slug: string;
}>;
export declare const i18nCopyItemDetails: z.ZodObject<{
    externalPath: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    path: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNull]>>;
    related: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, "strip", z.ZodUnknown, z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">, z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip">>>>;
    title: z.ZodString;
    type: z.ZodEnum<["INTERNAL", "EXTERNAL", "WRAPPER"]>;
    uiRouterKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    title: string;
    uiRouterKey: string;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: z.objectOutputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
}, {
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    title: string;
    uiRouterKey: string;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: z.objectInputType<{
        documentId: z.ZodOptional<z.ZodString>;
        __type: z.ZodString;
    }, z.ZodUnknown, "strip"> | null | undefined;
}>;
export {};
