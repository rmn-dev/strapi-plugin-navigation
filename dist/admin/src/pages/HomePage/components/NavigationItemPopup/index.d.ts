import { FC } from 'react';
import { NavigationSchema } from '../../../../api/validators';
import { Effect } from '../../../../types';
import { NavigationItemFormSchema, SubmitEffect } from '../NavigationItemForm';
interface Props {
    currentItem?: Partial<NavigationItemFormSchema>;
    isOpen: boolean;
    isLoading: boolean;
    onSubmit: SubmitEffect;
    onClose: Effect<any>;
    availableLocale: Array<string>;
    locale: string;
    permissions?: {
        canUpdate?: boolean;
    };
    currentNavigation: Pick<NavigationSchema, 'id' | 'documentId' | 'locale'>;
}
declare const NavigationItemPopUp: FC<Props>;
export default NavigationItemPopUp;
