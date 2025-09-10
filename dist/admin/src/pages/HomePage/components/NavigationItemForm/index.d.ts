/// <reference types="react" />
import { NavigationSchema } from '../../../../api/validators';
import { Effect, VoidEffect } from '../../../../types';
import { ContentTypeEntity } from './types';
import { NavigationItemFormSchema } from './utils/form';
export { ContentTypeEntity, GetContentTypeEntitiesPayload } from './types';
export { NavigationItemFormSchema } from './utils/form';
export type SubmitEffect = Effect<NavigationItemFormSchema>;
type NavigationItemFormProps = {
    appendLabelPublicationStatus: (label: string, entity: ContentTypeEntity, _: boolean) => string;
    current: Partial<NavigationItemFormSchema>;
    isLoading: boolean;
    locale: string;
    onCancel: VoidEffect;
    onSubmit: SubmitEffect;
    availableLocale: string[];
    permissions?: Partial<{
        canUpdate: boolean;
    }>;
    currentNavigation: Pick<NavigationSchema, 'id' | 'documentId' | 'locale'>;
};
export declare const NavigationItemForm: React.FC<NavigationItemFormProps>;
