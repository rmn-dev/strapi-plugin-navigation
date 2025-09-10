import { Core } from '@strapi/strapi';
import { CreateBranchNavigationItemDTO, NavigationItemDTO } from '../../dtos';
import { NavigationDBSchema } from '../../schemas';
import { NavigationAction } from '../../types';
export type AuditLogContext = {
    emit: (e: string, d: AuditLogParams) => void;
};
export type AuditLogParams = {
    actionType: string;
    oldEntity: NavigationDBSchema;
    newEntity: NavigationDBSchema;
} | {
    actionType: 'DELETE';
    entity: NavigationDBSchema;
};
export declare const sendAuditLog: (auditLogInstance: AuditLogContext, event: string, data: AuditLogParams) => void;
export declare const prepareAuditLog: (actions: NavigationAction[]) => string;
type FillCopyContext = {
    master: NavigationDBSchema;
    strapi: Core.Strapi;
    locale: string;
    entities: Map<string, NavigationItemDTO['related']>;
};
export declare const processItems: (context: FillCopyContext) => (item: CreateBranchNavigationItemDTO) => Promise<CreateBranchNavigationItemDTO>;
export declare const intercalate: <T, U extends T>(glue: T, arr: U[]) => (T | U)[];
export declare const getCacheStatus: ({ strapi, }: {
    strapi: Core.Strapi;
}) => Promise<{
    hasCachePlugin: boolean;
    enabled: boolean;
}>;
export {};
