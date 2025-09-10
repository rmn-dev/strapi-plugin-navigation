export type { ConfigSchema, NavigationItemAdditionalField, NavigationItemCustomField, NavigationItemCustomFieldBase, NavigationItemCustomFieldMedia, NavigationItemCustomFieldPrimitive, NavigationItemCustomFieldSelect, NavigationPluginConfigDBSchema, PluginConfigKeys, } from './config';
export * from './content-type';
export type * from './navigation';
export { audienceDBSchema, navigationDBSchema, navigationItemDBSchema, navigationItemsDBSchema, navigationItemType, readNavigationItemFromLocaleSchema, updateNavigationItemSchema, updateNavigationItemsSchema, } from './navigation';
export declare const updateConfigSchema: (modifier: (base: import("zod").ZodObject<{
    additionalFields: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodEnum<["boolean", "string"]>;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"media">;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"select">;
        multi: import("zod").ZodBoolean;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }>]>]>, "many">;
    allowedLevels: import("zod").ZodNumber;
    contentTypes: import("zod").ZodArray<import("zod").ZodString, "many">;
    defaultContentType: import("zod").ZodOptional<import("zod").ZodString>;
    contentTypesNameFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
    contentTypesPopulate: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
    gql: import("zod").ZodObject<{
        navigationItemRelated: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        navigationItemRelated: string[];
    }, {
        navigationItemRelated: string[];
    }>;
    pathDefaultFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
    cascadeMenuAttached: import("zod").ZodBoolean;
    preferCustomContentTypes: import("zod").ZodBoolean;
    isCacheEnabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    additionalFields: ("audience" | {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    contentTypes: string[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, any>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
}, {
    additionalFields: ("audience" | {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    contentTypes: string[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, any>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
}>) => import("zod").ZodObject<{
    additionalFields: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodEnum<["boolean", "string"]>;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"media">;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"select">;
        multi: import("zod").ZodBoolean;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }>]>]>, "many">;
    allowedLevels: import("zod").ZodNumber;
    contentTypes: import("zod").ZodArray<import("zod").ZodString, "many">;
    defaultContentType: import("zod").ZodOptional<import("zod").ZodString>;
    contentTypesNameFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
    contentTypesPopulate: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
    gql: import("zod").ZodObject<{
        navigationItemRelated: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        navigationItemRelated: string[];
    }, {
        navigationItemRelated: string[];
    }>;
    pathDefaultFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
    cascadeMenuAttached: import("zod").ZodBoolean;
    preferCustomContentTypes: import("zod").ZodBoolean;
    isCacheEnabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, "strip", import("zod").ZodTypeAny, {
    additionalFields: ("audience" | {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    contentTypes: string[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, any>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
}, {
    additionalFields: ("audience" | {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    contentTypes: string[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, any>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
}>) => void;
export declare const updateNavigationItemAdditionalField: (modifier: (base: import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodEnum<["boolean", "string"]>;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"media">;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"select">;
    multi: import("zod").ZodBoolean;
    options: import("zod").ZodArray<import("zod").ZodString, "many">;
}, "strip", import("zod").ZodTypeAny, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}>]>]>) => import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodEnum<["boolean", "string"]>;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"media">;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"select">;
    multi: import("zod").ZodBoolean;
    options: import("zod").ZodArray<import("zod").ZodString, "many">;
}, "strip", import("zod").ZodTypeAny, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}>]>]>) => void;
export declare const updateNavigationItemCustomField: (modifier: (base: import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodEnum<["boolean", "string"]>;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"media">;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"select">;
    multi: import("zod").ZodBoolean;
    options: import("zod").ZodArray<import("zod").ZodString, "many">;
}, "strip", import("zod").ZodTypeAny, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}>]>) => import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodEnum<["boolean", "string"]>;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "string" | "boolean";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"media">;
    multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
    options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}, {
    type: "media";
    name: string;
    label: string;
    options?: string[] | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
    multi?: false | undefined;
}>, import("zod").ZodObject<{
    name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    label: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodString>;
    placeholder: import("zod").ZodOptional<import("zod").ZodString>;
    required: import("zod").ZodOptional<import("zod").ZodBoolean>;
    enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
} & {
    type: import("zod").ZodLiteral<"select">;
    multi: import("zod").ZodBoolean;
    options: import("zod").ZodArray<import("zod").ZodString, "many">;
}, "strip", import("zod").ZodTypeAny, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}, {
    options: string[];
    type: "select";
    name: string;
    label: string;
    multi: boolean;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}>]>) => void;
export declare const updateCreateNavigationSchema: (modifier: (base: import("zod").ZodObject<Omit<{
    id: import("zod").ZodNumber;
    documentId: import("zod").ZodString;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    locale: import("zod").ZodString;
    visible: import("zod").ZodBoolean;
    items: import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many"> | import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many">>;
}, "id" | "documentId" | "slug" | "locale" | "items"> & {
    documentId: import("zod").ZodOptional<import("zod").ZodString>;
    id: import("zod").ZodOptional<import("zod").ZodUndefined>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}>) => import("zod").ZodObject<Omit<{
    id: import("zod").ZodNumber;
    documentId: import("zod").ZodString;
    name: import("zod").ZodString;
    slug: import("zod").ZodString;
    locale: import("zod").ZodString;
    visible: import("zod").ZodBoolean;
    items: import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many"> | import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many">>;
}, "id" | "documentId" | "slug" | "locale" | "items"> & {
    documentId: import("zod").ZodOptional<import("zod").ZodString>;
    id: import("zod").ZodOptional<import("zod").ZodUndefined>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}, {
    name: string;
    visible: boolean;
    id?: undefined;
    documentId?: string | undefined;
}>) => void;
export declare const updateUpdateNavigationSchema: (modifier: (base: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    id: import("zod").ZodNumber;
    documentId: import("zod").ZodString;
    slug: import("zod").ZodOptional<import("zod").ZodString>;
    locale: import("zod").ZodOptional<import("zod").ZodString>;
    visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
    items: import("zod").ZodOptional<import("zod").ZodArray<import("./navigation").UpdateNavigationItemSchema, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}>) => import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    id: import("zod").ZodNumber;
    documentId: import("zod").ZodString;
    slug: import("zod").ZodOptional<import("zod").ZodString>;
    locale: import("zod").ZodOptional<import("zod").ZodString>;
    visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
    items: import("zod").ZodOptional<import("zod").ZodArray<import("./navigation").UpdateNavigationItemSchema, "many">>;
}, "strip", import("zod").ZodTypeAny, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}, {
    id: number;
    documentId: string;
    name?: string | undefined;
    slug?: string | undefined;
    locale?: string | undefined;
    visible?: boolean | undefined;
    items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
}>) => void;
export declare const DynamicSchemas: {
    readonly configSchema: import("zod").ZodObject<{
        additionalFields: import("zod").ZodArray<import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
            name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
            label: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            placeholder: import("zod").ZodOptional<import("zod").ZodString>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
        } & {
            type: import("zod").ZodEnum<["boolean", "string"]>;
            multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
            type: "string" | "boolean";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        }, {
            type: "string" | "boolean";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        }>, import("zod").ZodObject<{
            name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
            label: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            placeholder: import("zod").ZodOptional<import("zod").ZodString>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
        } & {
            type: import("zod").ZodLiteral<"media">;
            multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
            options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        }, "strip", import("zod").ZodTypeAny, {
            type: "media";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        }, {
            type: "media";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        }>, import("zod").ZodObject<{
            name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
            label: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            placeholder: import("zod").ZodOptional<import("zod").ZodString>;
            required: import("zod").ZodOptional<import("zod").ZodBoolean>;
            enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
        } & {
            type: import("zod").ZodLiteral<"select">;
            multi: import("zod").ZodBoolean;
            options: import("zod").ZodArray<import("zod").ZodString, "many">;
        }, "strip", import("zod").ZodTypeAny, {
            options: string[];
            type: "select";
            name: string;
            label: string;
            multi: boolean;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
        }, {
            options: string[];
            type: "select";
            name: string;
            label: string;
            multi: boolean;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
        }>]>]>, "many">;
        allowedLevels: import("zod").ZodNumber;
        contentTypes: import("zod").ZodArray<import("zod").ZodString, "many">;
        defaultContentType: import("zod").ZodOptional<import("zod").ZodString>;
        contentTypesNameFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
        contentTypesPopulate: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodArray<import("zod").ZodString, "many">>;
        gql: import("zod").ZodObject<{
            navigationItemRelated: import("zod").ZodArray<import("zod").ZodString, "many">;
        }, "strip", import("zod").ZodTypeAny, {
            navigationItemRelated: string[];
        }, {
            navigationItemRelated: string[];
        }>;
        pathDefaultFields: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
        cascadeMenuAttached: import("zod").ZodBoolean;
        preferCustomContentTypes: import("zod").ZodBoolean;
        isCacheEnabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        additionalFields: ("audience" | {
            type: "string" | "boolean";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            type: "media";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            options: string[];
            type: "select";
            name: string;
            label: string;
            multi: boolean;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
        })[];
        allowedLevels: number;
        contentTypes: string[];
        contentTypesNameFields: Record<string, string[]>;
        contentTypesPopulate: Record<string, string[]>;
        gql: {
            navigationItemRelated: string[];
        };
        pathDefaultFields: Record<string, any>;
        cascadeMenuAttached: boolean;
        preferCustomContentTypes: boolean;
        defaultContentType?: string | undefined;
        isCacheEnabled?: boolean | undefined;
    }, {
        additionalFields: ("audience" | {
            type: "string" | "boolean";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            type: "media";
            name: string;
            label: string;
            options?: string[] | undefined;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
            multi?: false | undefined;
        } | {
            options: string[];
            type: "select";
            name: string;
            label: string;
            multi: boolean;
            description?: string | undefined;
            placeholder?: string | undefined;
            required?: boolean | undefined;
            enabled?: boolean | undefined;
        })[];
        allowedLevels: number;
        contentTypes: string[];
        contentTypesNameFields: Record<string, string[]>;
        contentTypesPopulate: Record<string, string[]>;
        gql: {
            navigationItemRelated: string[];
        };
        pathDefaultFields: Record<string, any>;
        cascadeMenuAttached: boolean;
        preferCustomContentTypes: boolean;
        defaultContentType?: string | undefined;
        isCacheEnabled?: boolean | undefined;
    }>;
    readonly navigationItemAdditionalField: import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodEnum<["boolean", "string"]>;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"media">;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"select">;
        multi: import("zod").ZodBoolean;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }>]>]>;
    readonly navigationItemCustomField: import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodEnum<["boolean", "string"]>;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"media">;
        multi: import("zod").ZodOptional<import("zod").ZodLiteral<false>>;
        options: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }, {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    }>, import("zod").ZodObject<{
        name: import("zod").ZodEffects<import("zod").ZodString, string, string>;
        label: import("zod").ZodString;
        description: import("zod").ZodOptional<import("zod").ZodString>;
        placeholder: import("zod").ZodOptional<import("zod").ZodString>;
        required: import("zod").ZodOptional<import("zod").ZodBoolean>;
        enabled: import("zod").ZodOptional<import("zod").ZodBoolean>;
    } & {
        type: import("zod").ZodLiteral<"select">;
        multi: import("zod").ZodBoolean;
        options: import("zod").ZodArray<import("zod").ZodString, "many">;
    }, "strip", import("zod").ZodTypeAny, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }, {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    }>]>;
    readonly createNavigationSchema: import("zod").ZodObject<Omit<{
        id: import("zod").ZodNumber;
        documentId: import("zod").ZodString;
        name: import("zod").ZodString;
        slug: import("zod").ZodString;
        locale: import("zod").ZodString;
        visible: import("zod").ZodBoolean;
        items: import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many"> | import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<import("./navigation").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./navigation").NavigationItemDBSchema>, "many">>;
    }, "id" | "documentId" | "slug" | "locale" | "items"> & {
        documentId: import("zod").ZodOptional<import("zod").ZodString>;
        id: import("zod").ZodOptional<import("zod").ZodUndefined>;
    }, "strip", import("zod").ZodTypeAny, {
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
    readonly updateNavigationSchema: import("zod").ZodObject<{
        name: import("zod").ZodOptional<import("zod").ZodString>;
        id: import("zod").ZodNumber;
        documentId: import("zod").ZodString;
        slug: import("zod").ZodOptional<import("zod").ZodString>;
        locale: import("zod").ZodOptional<import("zod").ZodString>;
        visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
        items: import("zod").ZodOptional<import("zod").ZodArray<import("./navigation").UpdateNavigationItemSchema, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        id: number;
        documentId: string;
        name?: string | undefined;
        slug?: string | undefined;
        locale?: string | undefined;
        visible?: boolean | undefined;
        items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
    }, {
        id: number;
        documentId: string;
        name?: string | undefined;
        slug?: string | undefined;
        locale?: string | undefined;
        visible?: boolean | undefined;
        items?: Omit<import("./navigation").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
    }>;
};
