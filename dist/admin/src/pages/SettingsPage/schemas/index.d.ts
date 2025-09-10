import { z } from 'zod';
export type UiFormSchema = z.infer<typeof uiFormSchema>;
export declare const uiFormSchema: z.ZodObject<{
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
    gql: z.ZodObject<{
        navigationItemRelated: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        navigationItemRelated: string[];
    }, {
        navigationItemRelated: string[];
    }>;
    cascadeMenuAttached: z.ZodBoolean;
    preferCustomContentTypes: z.ZodBoolean;
    isCacheEnabled: z.ZodOptional<z.ZodBoolean>;
    isCachePluginEnabled: z.ZodOptional<z.ZodBoolean>;
} & {
    audienceFieldChecked: z.ZodBoolean;
    contentTypesNameFields: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        fields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        fields: string[];
    }, {
        key: string;
        fields: string[];
    }>, "many">;
    contentTypesPopulate: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        fields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        fields: string[];
    }, {
        key: string;
        fields: string[];
    }>, "many">;
    pathDefaultFields: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        fields: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        fields: string[];
    }, {
        key: string;
        fields: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    additionalFields: ("audience" | {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    } | {
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
    })[];
    allowedLevels: number;
    availableAudience: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[];
    contentTypes: string[];
    contentTypesNameFields: {
        key: string;
        fields: string[];
    }[];
    contentTypesPopulate: {
        key: string;
        fields: string[];
    }[];
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: {
        key: string;
        fields: string[];
    }[];
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    audienceFieldChecked: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
    isCachePluginEnabled?: boolean | undefined;
}, {
    additionalFields: ("audience" | {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    } | {
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
    })[];
    allowedLevels: number;
    availableAudience: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[];
    contentTypes: string[];
    contentTypesNameFields: {
        key: string;
        fields: string[];
    }[];
    contentTypesPopulate: {
        key: string;
        fields: string[];
    }[];
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: {
        key: string;
        fields: string[];
    }[];
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    audienceFieldChecked: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
    isCachePluginEnabled?: boolean | undefined;
}>;
