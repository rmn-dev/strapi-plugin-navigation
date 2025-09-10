import { Core } from '@strapi/strapi';
import { Context as KoaContext } from 'koa';
import * as z from 'zod';
export type KoaContextExtension = {
    request: KoaContext['request'] & {
        body: unknown;
    };
};
export default function adminController(context: {
    strapi: Core.Strapi;
}): {
    getAdminService(): {
        config({ viaSettingsPage }: import("../services/admin/types").ConfigInput): Promise<import("../dtos").NavigationPluginConfigDTO>;
        configContentTypes({ viaSettingsPage, }: import("../services/admin/types").ConfigInput): Promise<import("../dtos").ConfigContentTypeDTO[]>;
        get({ ids, locale }: import("../services/admin/types").GetInput): Promise<{
            name: string;
            id: number;
            documentId: string;
            slug: string;
            locale: string;
            visible: boolean;
            items?: import("../schemas").NavigationItemDBSchema[] | undefined;
        }[]>;
        getById({ documentId, locale, populate }: import("../services/admin/types").GetByIdInput): Promise<{
            name: string;
            id: number;
            documentId: string;
            slug: string;
            locale: string;
            visible: boolean;
            items?: import("../schemas").NavigationItemDBSchema[] | undefined;
        }>;
        post({ auditLog, payload }: import("../services/admin/types").PostInput): Promise<import("../dtos").NavigationDTO>;
        put({ auditLog, payload }: import("../services/admin/types").PutInput): Promise<{
            name: string;
            id: number;
            documentId: string;
            slug: string;
            locale: string;
            visible: boolean;
            items?: import("../schemas").NavigationItemDBSchema[] | undefined;
        }>;
        delete({ auditLog, documentId }: import("../services/admin/types").DeleteInput): Promise<void>;
        restart(): Promise<void>;
        restoreConfig(): Promise<void>;
        refreshNavigationLocale(newLocale?: string | undefined): Promise<void>;
        updateConfig({ config: newConfig }: import("../services/admin/types").UpdateConfigInput): Promise<void>;
        fillFromOtherLocale({ auditLog, source, target, documentId, }: import("../services/admin/types").FillFromOtherLocaleInput): Promise<{
            name: string;
            id: number;
            documentId: string;
            slug: string;
            locale: string;
            visible: boolean;
            items?: import("../schemas").NavigationItemDBSchema[] | undefined;
        }>;
        i18nNavigationContentsCopy({ source, target, }: import("../services/admin/types").I18nNavigationContentsCopyInput): Promise<void>;
        readNavigationItemFromLocale({ path, source, target, }: import("../services/admin/types").ReadNavigationItemFromLocaleInput): Promise<{
            type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
            title: string;
            uiRouterKey: string;
            path?: string | null | undefined;
            externalPath?: string | null | undefined;
            related?: unknown;
        }>;
        getContentTypeItems({ query, uid, }: import("../services/admin/types").GetContentTypeItemsInput): Promise<{
            documentId: string;
        }[]>;
        purgeNavigationCache(documentId: string, clearLocalisations?: boolean | undefined): Promise<{
            success: boolean;
        }>;
        purgeNavigationsCache(): Promise<{
            success: boolean;
        }>;
    };
    getCommonService(): {
        getPluginStore(): Promise<{
            get(params?: Partial<{
                key: string;
                type?: string | undefined;
                environment?: string | undefined;
                name?: string | undefined;
                tag?: string | undefined;
            }> | undefined): Promise<unknown>;
            set(params?: Partial<{
                key: string;
                value: unknown;
                type?: string | undefined;
                environment?: string | undefined;
                name?: string | undefined;
                tag?: string | undefined;
            }> | undefined): Promise<void>;
            delete(params?: Partial<{
                key: string;
                type?: string | undefined;
                environment?: string | undefined;
                name?: string | undefined;
                tag?: string | undefined;
            }> | undefined): Promise<void>;
        }>;
        mapToNavigationItemDTO({ locale, master, navigationItems, parent, populate, status, }: import("../services/common/types").MapToNavigationItemDTOInput): Promise<import("../dtos").NavigationItemDTO[]>;
        setDefaultConfig(): Promise<{
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
        getBranchName({ item }: import("../services/common/types").GetBranchNameInput): void | import("../types").NavigationActionsCategories;
        analyzeBranch({ masterEntity, navigationItems, parentItem, prevAction, }: import("../services/common/types").AnalyzeBranchInput): Promise<import("../types").NavigationAction[]>;
        removeBranch({ navigationItems, action, }: import("../services/common/types").RemoveBranchInput): Promise<import("../types").NavigationAction[]>;
        createBranch({ action, masterEntity, navigationItems, parentItem, }: import("../services/common/types").CreateBranchInput): Promise<import("../types").NavigationAction[]>;
        updateBranch({ masterEntity, navigationItems, action, parentItem, }: import("../services/common/types").UpdateBranchInput): Promise<import("../types").NavigationAction[]>;
        emitEvent({ entity, event, uid }: import("../services/common/types").EmitEventInput<any, any>): Promise<void>;
        pruneCustomFields({ removedFields }: {
            removedFields: ({
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
        }): Promise<void>;
        getSlug({ query }: import("../services/common/types").GetSlugInput): Promise<string>;
        registerLifeCycleHook({ callback, contentTypeName, hookName }: import("../services/common/types").RegisterLifeCycleHookInput): void;
        runLifeCycleHook({ contentTypeName, event, hookName }: import("../services/common/types").RunLifeCycleHookInput): Promise<void>;
        buildNestedStructure({ navigationItems, id, }: import("../services/common/types").BuildNestedStructureInput): import("../schemas").NavigationItemDBSchema[];
        readLocale(): Promise<{
            defaultLocale: string;
            restLocale: string[];
        }>;
        updateConfigSchema: (modifier: (base: z.ZodObject<{
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
        }>) => z.ZodObject<{
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
        }>) => void;
        updateCreateNavigationSchema: (modifier: (base: z.ZodObject<Omit<{
            id: z.ZodNumber;
            documentId: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            locale: z.ZodString;
            visible: z.ZodBoolean;
            items: z.ZodArray<z.ZodType<import("../schemas").NavigationItemDBSchema, z.ZodTypeDef, import("../schemas").NavigationItemDBSchema>, "many"> | z.ZodOptional<z.ZodArray<z.ZodType<import("../schemas").NavigationItemDBSchema, z.ZodTypeDef, import("../schemas").NavigationItemDBSchema>, "many">>;
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
        }>) => z.ZodObject<Omit<{
            id: z.ZodNumber;
            documentId: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            locale: z.ZodString;
            visible: z.ZodBoolean;
            items: z.ZodArray<z.ZodType<import("../schemas").NavigationItemDBSchema, z.ZodTypeDef, import("../schemas").NavigationItemDBSchema>, "many"> | z.ZodOptional<z.ZodArray<z.ZodType<import("../schemas").NavigationItemDBSchema, z.ZodTypeDef, import("../schemas").NavigationItemDBSchema>, "many">>;
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
        }>) => void;
        updateNavigationItemAdditionalField: (modifier: (base: z.ZodUnion<[z.ZodLiteral<"audience">, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>]>) => z.ZodUnion<[z.ZodLiteral<"audience">, z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>]>) => void;
        updateNavigationItemCustomField: (modifier: (base: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>) => z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
        }>]>) => void;
        updateUpdateNavigationSchema: (modifier: (base: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            id: z.ZodNumber;
            documentId: z.ZodString;
            slug: z.ZodOptional<z.ZodString>;
            locale: z.ZodOptional<z.ZodString>;
            visible: z.ZodOptional<z.ZodBoolean>;
            items: z.ZodOptional<z.ZodArray<import("../schemas").UpdateNavigationItemSchema, "many">>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            documentId: string;
            name?: string | undefined;
            slug?: string | undefined;
            locale?: string | undefined;
            visible?: boolean | undefined;
            items?: Omit<import("../schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
        }, {
            id: number;
            documentId: string;
            name?: string | undefined;
            slug?: string | undefined;
            locale?: string | undefined;
            visible?: boolean | undefined;
            items?: Omit<import("../schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
        }>) => z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            id: z.ZodNumber;
            documentId: z.ZodString;
            slug: z.ZodOptional<z.ZodString>;
            locale: z.ZodOptional<z.ZodString>;
            visible: z.ZodOptional<z.ZodBoolean>;
            items: z.ZodOptional<z.ZodArray<import("../schemas").UpdateNavigationItemSchema, "many">>;
        }, "strip", z.ZodTypeAny, {
            id: number;
            documentId: string;
            name?: string | undefined;
            slug?: string | undefined;
            locale?: string | undefined;
            visible?: boolean | undefined;
            items?: Omit<import("../schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
        }, {
            id: number;
            documentId: string;
            name?: string | undefined;
            slug?: string | undefined;
            locale?: string | undefined;
            visible?: boolean | undefined;
            items?: Omit<import("../schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
        }>) => void;
    };
    get(): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }[]>;
    post(ctx: KoaContext & KoaContextExtension): Promise<import("../dtos").NavigationDTO | KoaContext>;
    put(ctx: KoaContext & KoaContextExtension): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    } | KoaContext>;
    delete(ctx: KoaContext): Promise<{}>;
    config(): Promise<import("../dtos").NavigationPluginConfigDTO>;
    updateConfig(ctx: KoaContext & KoaContextExtension): Promise<{}>;
    restoreConfig(): Promise<{}>;
    settingsConfig(): Promise<import("../dtos").NavigationPluginConfigDTO>;
    settingsRestart(): Promise<{}>;
    getById(ctx: KoaContext): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }>;
    getContentTypeItems(ctx: KoaContext): Promise<{
        documentId: string;
    }[]>;
    fillFromOtherLocale(ctx: KoaContext): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }>;
    readNavigationItemFromLocale(ctx: KoaContext): Promise<{
        type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
        title: string;
        uiRouterKey: string;
        path?: string | null | undefined;
        externalPath?: string | null | undefined;
        related?: unknown;
    }>;
    getSlug(ctx: KoaContext): Promise<{
        slug: string;
    }>;
    settingsLocale(): Promise<{
        defaultLocale: string;
        restLocale: string[];
    }>;
};
