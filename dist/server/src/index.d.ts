export type { AdminService, ClientService, CommonService, MigrationService } from './services';
declare const _default: {
    bootstrap: (context: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {
            additionalFields: never[];
            allowedLevels: number;
            contentTypes: never[];
            defaultContentType: string;
            contentTypesNameFields: {};
            contentTypesPopulate: {};
            gql: {
                navigationItemRelated: never[];
            };
            pathDefaultFields: {};
            pruneObsoleteI18nNavigations: boolean;
            cascadeMenuAttached: boolean;
            preferCustomContentTypes: boolean;
            isCacheEnabled: boolean;
        };
    };
    controllers: {
        admin: typeof import("./controllers/admin").default;
        client: typeof import("./controllers/client").default;
    };
    contentTypes: {
        audience: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    comment: string;
                };
                attributes: {
                    name: {
                        type: string;
                        required: boolean;
                    };
                    key: {
                        type: string;
                        targetField: string;
                    };
                };
            };
        };
        navigation: {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                    name: string;
                };
                options: {
                    comment: string;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                    i18n: {
                        localized: boolean;
                    };
                };
                attributes: {
                    name: {
                        type: string;
                        configurable: boolean;
                        required: boolean;
                    };
                    slug: {
                        type: string;
                        target: string;
                        configurable: boolean;
                        required: boolean;
                    };
                    visible: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    items: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        mappedBy: string;
                    };
                };
            };
            lifecycles: Record<string, import("./types").Effect<import("./types").LifeCycleEvent<import("./types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
        };
        'navigation-item': {
            schema: {
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string; /**
                     * Plugin server methods
                     */
                    displayName: string;
                    name: string;
                };
                options: {
                    increments: boolean;
                    timestamps: boolean;
                    comment: string;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                    i18n: {
                        localized: boolean;
                    };
                };
                attributes: {
                    title: {
                        type: string;
                        configurable: boolean;
                        required: boolean;
                        pluginOptions: {
                            i18n: {
                                localized: boolean;
                            };
                        };
                    };
                    type: {
                        type: string;
                        enum: string[];
                        default: string;
                        configurable: boolean;
                    };
                    path: {
                        type: string;
                        targetField: string;
                        configurable: boolean;
                    };
                    externalPath: {
                        type: string;
                        configurable: boolean;
                    };
                    uiRouterKey: {
                        type: string;
                        configurable: boolean;
                    };
                    menuAttached: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    order: {
                        type: string;
                        default: number;
                        configurable: boolean;
                    };
                    collapsed: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    autoSync: {
                        type: string;
                        default: boolean;
                        configurable: boolean;
                    };
                    related: {
                        type: string;
                        relation: string;
                        required: boolean;
                        configurable: boolean;
                    };
                    parent: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        default: null;
                    };
                    master: {
                        type: string;
                        relation: string;
                        target: string;
                        configurable: boolean;
                        inversedBy: string;
                    };
                    audience: {
                        type: string;
                        relation: string;
                        target: string;
                    };
                    additionalFields: {
                        type: string;
                        require: boolean;
                        default: {};
                    };
                };
            };
            lifecycles: Record<string, import("./types").Effect<import("./types").LifeCycleEvent<import("./types").LifeCycleHookName, unknown, Record<string, unknown>>>>;
        };
    };
    middlewares: {};
    policies: {};
    routes: {
        admin: {
            type: string;
            routes: ({
                method: string;
                path: string; /**
                 * Plugin server methods
                 */
                handler: string;
                config: {
                    policies: {
                        name: string;
                        config: {
                            actions: string[];
                        };
                    }[];
                };
            } | {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: string[];
                };
            })[];
        };
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: never[];
                };
            }[];
        };
    };
    services: {
        admin: (context: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            config({ viaSettingsPage }: import("./services/admin/types").ConfigInput): Promise<import("./dtos").NavigationPluginConfigDTO>;
            configContentTypes({ viaSettingsPage, }: import("./services/admin/types").ConfigInput): Promise<import("./dtos").ConfigContentTypeDTO[]>;
            get({ ids, locale }: import("./services/admin/types").GetInput): Promise<{
                name: string;
                id: number;
                documentId: string;
                slug: string;
                locale: string;
                visible: boolean;
                items?: import("./schemas").NavigationItemDBSchema[] | undefined;
            }[]>;
            getById({ documentId, locale, populate }: import("./services/admin/types").GetByIdInput): Promise<{
                name: string;
                id: number;
                documentId: string;
                slug: string;
                locale: string;
                visible: boolean;
                items?: import("./schemas").NavigationItemDBSchema[] | undefined;
            }>;
            post({ auditLog, payload }: import("./services/admin/types").PostInput): Promise<import("./dtos").NavigationDTO>;
            put({ auditLog, payload }: import("./services/admin/types").PutInput): Promise<{
                name: string;
                id: number;
                documentId: string;
                slug: string;
                locale: string;
                visible: boolean;
                items?: import("./schemas").NavigationItemDBSchema[] | undefined;
            }>;
            delete({ auditLog, documentId }: import("./services/admin/types").DeleteInput): Promise<void>;
            restart(): Promise<void>;
            restoreConfig(): Promise<void>;
            refreshNavigationLocale(newLocale?: string | undefined): Promise<void>;
            updateConfig({ config: newConfig }: import("./services/admin/types").UpdateConfigInput): Promise<void>;
            fillFromOtherLocale({ auditLog, source, target, documentId, }: import("./services/admin/types").FillFromOtherLocaleInput): Promise<{
                name: string;
                id: number;
                documentId: string;
                slug: string;
                locale: string;
                visible: boolean;
                items?: import("./schemas").NavigationItemDBSchema[] | undefined;
            }>;
            i18nNavigationContentsCopy({ source, target, }: import("./services/admin/types").I18nNavigationContentsCopyInput): Promise<void>;
            readNavigationItemFromLocale({ path, source, target, }: import("./services/admin/types").ReadNavigationItemFromLocaleInput): Promise<{
                type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
                title: string;
                uiRouterKey: string;
                path?: string | null | undefined;
                externalPath?: string | null | undefined;
                related?: unknown;
            }>;
            getContentTypeItems({ query, uid, }: import("./services/admin/types").GetContentTypeItemsInput): Promise<{
                documentId: string;
            }[]>;
            purgeNavigationCache(documentId: string, clearLocalisations?: boolean | undefined): Promise<{
                success: boolean;
            }>;
            purgeNavigationsCache(): Promise<{
                success: boolean;
            }>;
        };
        common: (context: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
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
                    tag?: string | undefined; /**
                     * Plugin server methods
                     */
                }> | undefined): Promise<void>;
                delete(params?: Partial<{
                    key: string;
                    type?: string | undefined;
                    environment?: string | undefined;
                    name?: string | undefined;
                    tag?: string | undefined;
                }> | undefined): Promise<void>;
            }>;
            mapToNavigationItemDTO({ locale, master, navigationItems, parent, populate, status, }: import("./services/common/types").MapToNavigationItemDTOInput): Promise<import("./dtos").NavigationItemDTO[]>;
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
            getBranchName({ item }: import("./services/common/types").GetBranchNameInput): void | import("./types").NavigationActionsCategories;
            analyzeBranch({ masterEntity, navigationItems, parentItem, prevAction, }: import("./services/common/types").AnalyzeBranchInput): Promise<import("./types").NavigationAction[]>;
            removeBranch({ navigationItems, action, }: import("./services/common/types").RemoveBranchInput): Promise<import("./types").NavigationAction[]>;
            createBranch({ action, masterEntity, navigationItems, parentItem, }: import("./services/common/types").CreateBranchInput): Promise<import("./types").NavigationAction[]>;
            updateBranch({ masterEntity, navigationItems, action, parentItem, }: import("./services/common/types").UpdateBranchInput): Promise<import("./types").NavigationAction[]>;
            emitEvent({ entity, event, uid }: import("./services/common/types").EmitEventInput<any, any>): Promise<void>;
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
            getSlug({ query }: import("./services/common/types").GetSlugInput): Promise<string>;
            registerLifeCycleHook({ callback, contentTypeName, hookName }: import("./services/common/types").RegisterLifeCycleHookInput): void;
            runLifeCycleHook({ contentTypeName, event, hookName }: import("./services/common/types").RunLifeCycleHookInput): Promise<void>;
            buildNestedStructure({ navigationItems, id, }: import("./services/common/types").BuildNestedStructureInput): import("./schemas").NavigationItemDBSchema[];
            readLocale(): Promise<{
                defaultLocale: string;
                restLocale: string[];
            }>;
            updateConfigSchema: (modifier: (base: import("zod").ZodObject<{
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
            updateCreateNavigationSchema: (modifier: (base: import("zod").ZodObject<Omit<{
                id: import("zod").ZodNumber;
                documentId: import("zod").ZodString;
                name: import("zod").ZodString;
                slug: import("zod").ZodString;
                locale: import("zod").ZodString;
                visible: import("zod").ZodBoolean;
                items: import("zod").ZodArray<import("zod").ZodType<import("./schemas").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./schemas").NavigationItemDBSchema>, "many"> | import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<import("./schemas").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./schemas").NavigationItemDBSchema>, "many">>;
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
                items: import("zod").ZodArray<import("zod").ZodType<import("./schemas").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./schemas").NavigationItemDBSchema>, "many"> | import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<import("./schemas").NavigationItemDBSchema, import("zod").ZodTypeDef, import("./schemas").NavigationItemDBSchema>, "many">>;
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
            updateNavigationItemAdditionalField: (modifier: (base: import("zod").ZodUnion<[import("zod").ZodLiteral<"audience">, import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
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
            updateNavigationItemCustomField: (modifier: (base: import("zod").ZodDiscriminatedUnion<"type", [import("zod").ZodObject<{
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
            updateUpdateNavigationSchema: (modifier: (base: import("zod").ZodObject<{
                name: import("zod").ZodOptional<import("zod").ZodString>;
                id: import("zod").ZodNumber;
                documentId: import("zod").ZodString;
                slug: import("zod").ZodOptional<import("zod").ZodString>;
                locale: import("zod").ZodOptional<import("zod").ZodString>;
                visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
                items: import("zod").ZodOptional<import("zod").ZodArray<import("./schemas").UpdateNavigationItemSchema, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
                id: number;
                documentId: string;
                name?: string | undefined;
                slug?: string | undefined;
                locale?: string | undefined;
                visible?: boolean | undefined;
                items?: Omit<import("./schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
            }, {
                id: number;
                documentId: string;
                name?: string | undefined;
                slug?: string | undefined;
                locale?: string | undefined;
                visible?: boolean | undefined;
                items?: Omit<import("./schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
            }>) => import("zod").ZodObject<{
                name: import("zod").ZodOptional<import("zod").ZodString>;
                id: import("zod").ZodNumber;
                documentId: import("zod").ZodString;
                slug: import("zod").ZodOptional<import("zod").ZodString>;
                locale: import("zod").ZodOptional<import("zod").ZodString>;
                visible: import("zod").ZodOptional<import("zod").ZodBoolean>;
                items: import("zod").ZodOptional<import("zod").ZodArray<import("./schemas").UpdateNavigationItemSchema, "many">>;
            }, "strip", import("zod").ZodTypeAny, {
                id: number;
                documentId: string;
                name?: string | undefined;
                slug?: string | undefined;
                locale?: string | undefined;
                visible?: boolean | undefined;
                items?: Omit<import("./schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
            }, {
                id: number;
                documentId: string;
                name?: string | undefined;
                slug?: string | undefined;
                locale?: string | undefined;
                visible?: boolean | undefined;
                items?: Omit<import("./schemas").NavigationItemDBSchema, "id" | "documentId" | "items" | "parent">[] | undefined;
            }>) => void;
        };
        client: (context: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            readAll({ locale, orderBy, orderDirection }: import("./services/client/types").ReadAllInput): Promise<{
                name: string;
                id: number;
                documentId: string;
                slug: string;
                locale: string;
                visible: boolean;
                items?: import("./schemas").NavigationItemDBSchema[] | undefined;
            }[]>;
            renderRFRNavigationItem({ item }: import("./services/client/types").RenderRFRNavInput): import("./dtos").RFRNavigationItemDTO;
            renderRFRPage({ item, parent, enabledCustomFieldsNames }: import("./services/client/types").RenderRFRPageInput): import("./dtos").RFRPageDTO;
            renderRFR({ items, parent, parentNavItem, contentTypes, enabledCustomFieldsNames, }: import("./services/client/types").RenderRFRInput): {
                pages: {};
                nav: {};
            };
            renderTree({ items, documentId, path, itemParser, }: import("./services/client/types").RenderTreeInput): Promise<import("./dtos").NavigationItemDTO[]>;
            getCustomFields(additionalFields: ("audience" | {
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
            })[]): ({
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
            renderType({ criteria, filter, itemCriteria, locale, populate, rootPath, type, wrapRelated, status, }: import("./services/client/types").RenderTypeInput): Promise<import("./dtos").NavigationItemDTO[] | {
                pages: {};
                nav: {};
            } | {
                audience: string[] | undefined;
                title: string;
                related: any;
                items: null;
                additionalFields: {};
                path?: string | null | undefined;
                type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
                id: number;
                documentId: string;
                slug?: string | null | undefined;
                externalPath?: string | null | undefined;
                uiRouterKey: string;
                menuAttached: boolean;
                order: number;
                collapsed: boolean;
                autoSync?: boolean | null | undefined;
                master?: import("./dtos").NavigationDTO | undefined;
                parent?: import("./dtos").NavigationItemDTO | null | undefined;
            }[]>;
            renderChildren({ childUIKey, idOrSlug, locale, menuOnly, type, wrapRelated, status, }: import("./services/client/types").RenderChildrenInput): Promise<import("./dtos").NavigationItemDTO[] | {
                pages: {};
                nav: {};
            } | {
                audience: string[] | undefined;
                title: string;
                related: any;
                items: null;
                additionalFields: {};
                path?: string | null | undefined;
                type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
                id: number;
                documentId: string;
                slug?: string | null | undefined;
                externalPath?: string | null | undefined;
                uiRouterKey: string;
                menuAttached: boolean;
                order: number;
                collapsed: boolean;
                autoSync?: boolean | null | undefined;
                master?: import("./dtos").NavigationDTO | undefined;
                parent?: import("./dtos").NavigationItemDTO | null | undefined;
            }[]>;
            render({ idOrSlug, locale, menuOnly, populate, rootPath, type, wrapRelated, status, }: import("./services/client/types").RenderInput): Promise<import("./dtos").NavigationItemDTO[] | {
                pages: {};
                nav: {};
            } | {
                audience: string[] | undefined;
                title: string;
                related: any;
                items: null;
                additionalFields: {};
                path?: string | null | undefined;
                type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
                id: number;
                documentId: string;
                slug?: string | null | undefined;
                externalPath?: string | null | undefined;
                uiRouterKey: string;
                menuAttached: boolean;
                order: number;
                collapsed: boolean;
                autoSync?: boolean | null | undefined;
                master?: import("./dtos").NavigationDTO | undefined;
                parent?: import("./dtos").NavigationItemDTO | null | undefined;
            }[]>;
        };
        migrate: (context: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            migrateRelatedIdToDocumentId(): Promise<void>;
        };
    };
};
export default _default;
