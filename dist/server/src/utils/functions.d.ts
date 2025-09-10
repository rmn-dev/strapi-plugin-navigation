import { Core } from '@strapi/strapi';
import { NavigationItemAdditionalField, NavigationPluginConfigDBSchema } from '../schemas';
import { AdminService, ClientService, CommonService } from '../services';
import { ContentType, Effect, LifeCycleEvent, LifeCycleHookName, StrapiContentTypeFullSchema } from '../types';
type ServiceTypeMap = {
    common: CommonService;
    admin: AdminService;
    client: ClientService;
};
export declare const getCustomFields: (additionalFields: NavigationItemAdditionalField[]) => NavigationItemAdditionalField[];
export declare const validateAdditionalFields: (additionalFields: NavigationItemAdditionalField[]) => void;
export declare const assertNotEmpty: <T>(value: T | null | undefined, customError?: Error) => asserts value is T;
export declare const resolveGlobalLikeId: (uid?: string) => string;
export declare function assertConfig(config: unknown): asserts config is NavigationPluginConfigDBSchema;
export declare const buildHookListener: (contentTypeName: ContentType, context: {
    strapi: Core.Strapi;
}) => (hookName: LifeCycleHookName) => [LifeCycleHookName, Effect<LifeCycleEvent>];
export declare const buildAllHookListeners: (contentTypeName: ContentType, context: {
    strapi: Core.Strapi;
}) => Record<LifeCycleHookName | string, Effect<LifeCycleEvent>>;
export declare const getPluginModels: ({ strapi, }: {
    strapi: Core.Strapi;
}) => Record<'masterModel' | 'itemModel' | 'relatedModel' | 'audienceModel', StrapiContentTypeFullSchema>;
export declare function getPluginService<TName extends keyof ServiceTypeMap>({ strapi }: {
    strapi: Core.Strapi;
}, name: TName): TName extends infer TKey extends keyof ServiceTypeMap ? ServiceTypeMap[TKey] : never;
export declare const parsePopulateQuery: (populate: any) => any;
export declare const isContentTypeEligible: (uid?: string) => boolean;
export declare const singularize: (value?: string) => string;
export {};
