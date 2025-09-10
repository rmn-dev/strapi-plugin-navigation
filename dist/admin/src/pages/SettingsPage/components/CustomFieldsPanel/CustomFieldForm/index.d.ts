import React from 'react';
import { NavigationItemCustomField } from '../../../../../schemas';
import { Effect, VoidEffect } from '../../../../../types';
interface ICustomFieldFormProps {
    customField: NavigationItemCustomField | null;
    isEditForm: boolean;
    onSubmit: Effect<NavigationItemCustomField>;
    onClose: VoidEffect;
}
declare const CustomFieldForm: React.FC<ICustomFieldFormProps>;
export default CustomFieldForm;
