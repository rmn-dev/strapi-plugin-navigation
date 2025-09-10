import { LifeCycleHookName } from '../types';
export declare const UID_REGEX: RegExp;
export declare const allLifecycleHooks: ReadonlyArray<LifeCycleHookName>;
export declare const RELATED_ITEM_SEPARATOR = "$";
export declare const ALLOWED_CONTENT_TYPES: readonly ["api::", "plugin::"];
export declare const RESTRICTED_CONTENT_TYPES: readonly ["admin::", "plugin::content-releases", "plugin::i18n.locale", "plugin::navigation", "plugin::review-workflows", "plugin::users-permissions", "plugin::upload.folder"];
export declare const CONTENT_TYPES_NAME_FIELDS_DEFAULTS: string[];
export declare const KIND_TYPES: {
    readonly SINGLE: "singleType";
    readonly COLLECTION: "collectionType";
};
export declare const DEFAULT_POPULATE: never[];
export declare const FORBIDDEN_CUSTOM_FIELD_NAMES: string[];
