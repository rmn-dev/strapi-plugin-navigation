import * as z from 'zod';
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
    singularName: string;
    pluralName: string;
    displayName: string;
    name?: string | undefined;
    description?: string | undefined;
}, {
    singularName: string;
    pluralName: string;
    displayName: string;
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
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
}, {
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
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
    type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
}, {
    type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
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
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
}, {
    type: "enumeration";
    enum: string[];
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
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
export type ContentTypeUidAttribute = z.infer<typeof contentTypeDynamicZoneAttribute>;
export declare const contentTypeUidAttribute: z.ZodObject<{
    type: z.ZodLiteral<"uid">;
}, "strip", z.ZodTypeAny, {
    type: "uid";
}, {
    type: "uid";
}>;
export type ContentTypeMediaAttribute = z.infer<typeof contentTypeMediaAttribute>;
export declare const contentTypeMediaAttribute: z.ZodObject<{
    type: z.ZodLiteral<"media">;
    allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}, {
    type: "media";
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
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    target: string;
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}, {
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    target: string;
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
    type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
}, {
    type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
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
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
}, {
    type: "enumeration";
    enum: string[];
    required?: boolean | undefined;
    min?: number | undefined;
    max?: number | undefined;
    minLength?: number | undefined;
    maxLength?: number | undefined;
    private?: boolean | undefined;
    configurable?: boolean | undefined;
    default?: any;
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
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    target: string;
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}, {
    type: "relation";
    relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
    target: string;
    mappedBy?: string | undefined;
    inversedBy?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"media">;
    allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
    required: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}, {
    type: "media";
    allowedTypes: ("images" | "videos" | "audios" | "files")[];
    required?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"uid">;
}, "strip", z.ZodTypeAny, {
    type: "uid";
}, {
    type: "uid";
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
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    }, {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    }>;
    options: z.ZodOptional<z.ZodObject<{
        draftAndPublish: z.ZodOptional<z.ZodBoolean>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        templateName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    }, {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
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
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    }, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
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
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    }, {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
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
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }, {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"media">;
        allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }, {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"uid">;
    }, "strip", z.ZodTypeAny, {
        type: "uid";
    }, {
        type: "uid";
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
    uid: string;
    kind: "collectionType" | "singleType";
    collectionName: string;
    info: {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        type: "uid";
    } | {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
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
    isSingle?: boolean | undefined;
}, {
    uid: string;
    kind: "collectionType" | "singleType";
    collectionName: string;
    info: {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        type: "uid";
    } | {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
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
    isSingle?: boolean | undefined;
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
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    }, {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    }>;
    options: z.ZodOptional<z.ZodObject<{
        draftAndPublish: z.ZodOptional<z.ZodBoolean>;
        hidden: z.ZodOptional<z.ZodBoolean>;
        templateName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    }, {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
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
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    }, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
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
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    }, {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
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
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }, {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"media">;
        allowedTypes: z.ZodArray<z.ZodEnum<["images", "videos", "audios", "files"]>, "many">;
        required: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }, {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"uid">;
    }, "strip", z.ZodTypeAny, {
        type: "uid";
    }, {
        type: "uid";
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
}, "options" | "kind" | "info" | "attributes">, "strip", z.ZodTypeAny, {
    kind: "collectionType" | "singleType";
    info: {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        type: "uid";
    } | {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
}, {
    kind: "collectionType" | "singleType";
    info: {
        singularName: string;
        pluralName: string;
        displayName: string;
        name?: string | undefined;
        description?: string | undefined;
    };
    attributes: Record<string, {
        type: "string" | "boolean" | "integer" | "float" | "date" | "media" | "text" | "richtext" | "blocks" | "email" | "password" | "time" | "datetime" | "timestamp" | "biginteger" | "decimal" | "json" | "relation";
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "enumeration";
        enum: string[];
        required?: boolean | undefined;
        min?: number | undefined;
        max?: number | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        private?: boolean | undefined;
        configurable?: boolean | undefined;
        default?: any;
    } | {
        type: "component";
        component: string;
        repeatable?: boolean | undefined;
    } | {
        type: "dynamiczone";
        components: string[];
    } | {
        type: "uid";
    } | {
        type: "media";
        allowedTypes: ("images" | "videos" | "audios" | "files")[];
        required?: boolean | undefined;
    } | {
        type: "relation";
        relation: "oneToOne" | "oneToMany" | "manyToOne" | "manyToMany" | "morphToMany" | "manyToMorph";
        target: string;
        mappedBy?: string | undefined;
        inversedBy?: string | undefined;
    }>;
    options?: {
        draftAndPublish?: boolean | undefined;
        hidden?: boolean | undefined;
        templateName?: string | undefined;
    } | undefined;
}>;
