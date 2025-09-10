import { Core } from '@strapi/strapi';
import { ConfigContentTypeDTO, NavigationDTO, NavigationPluginConfigDTO } from '../../dtos';
import { NavigationDBSchema, ReadNavigationItemFromLocaleSchema } from '../../schemas';
import { ConfigInput, DeleteInput, FillFromOtherLocaleInput, GetByIdInput, GetContentTypeItemsInput, GetInput, I18nNavigationContentsCopyInput, PostInput, PutInput, ReadNavigationItemFromLocaleInput, UpdateConfigInput } from './types';
export type AdminService = ReturnType<typeof adminService>;
declare const adminService: (context: {
    strapi: Core.Strapi;
}) => {
    config({ viaSettingsPage }: ConfigInput): Promise<NavigationPluginConfigDTO>;
    configContentTypes({ viaSettingsPage, }: ConfigInput): Promise<ConfigContentTypeDTO[]>;
    get({ ids, locale }: GetInput): Promise<NavigationDBSchema[]>;
    getById({ documentId, locale, populate }: GetByIdInput): Promise<NavigationDBSchema>;
    post({ auditLog, payload }: PostInput): Promise<NavigationDTO>;
    put({ auditLog, payload }: PutInput): Promise<NavigationDBSchema>;
    delete({ auditLog, documentId }: DeleteInput): Promise<void>;
    restart(): Promise<void>;
    restoreConfig(): Promise<void>;
    refreshNavigationLocale(newLocale?: string): Promise<void>;
    updateConfig({ config: newConfig }: UpdateConfigInput): Promise<void>;
    fillFromOtherLocale({ auditLog, source, target, documentId, }: FillFromOtherLocaleInput): Promise<NavigationDBSchema>;
    i18nNavigationContentsCopy({ source, target, }: I18nNavigationContentsCopyInput): Promise<void>;
    readNavigationItemFromLocale({ path, source, target, }: ReadNavigationItemFromLocaleInput): Promise<ReadNavigationItemFromLocaleSchema>;
    getContentTypeItems({ query, uid, }: GetContentTypeItemsInput): Promise<{
        documentId: string;
    }[]>;
    purgeNavigationCache(documentId: string, clearLocalisations?: boolean): Promise<{
        success: boolean;
    }>;
    purgeNavigationsCache(): Promise<{
        success: boolean;
    }>;
};
export default adminService;
