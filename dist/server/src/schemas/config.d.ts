import * as z from 'zod';
export type PluginConfigKeys = keyof NavigationPluginConfigDBSchema;
export type NavigationPluginConfigDBSchema = z.infer<typeof configSchema>;
export type NavigationItemCustomFieldBase = z.infer<typeof navigationCustomFieldBase>;
declare const navigationCustomFieldBase: z.ZodObject<{
    name: z.ZodEffects<z.ZodString, string, string>;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodOptional<z.ZodBoolean>;
    enabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    label: string;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
}, {
    name: string;
    label: string;
    description?: string | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    enabled?: boolean | undefined;
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
export type ConfigSchema = z.infer<typeof configSchema>;
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
    allowedLevels: z.ZodNumber;
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
    pathDefaultFields: z.ZodRecord<z.ZodString, z.ZodAny>;
    cascadeMenuAttached: z.ZodBoolean;
    preferCustomContentTypes: z.ZodBoolean;
    isCacheEnabled: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
export {};
