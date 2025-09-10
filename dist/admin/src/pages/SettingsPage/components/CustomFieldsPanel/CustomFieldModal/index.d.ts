import React from 'react';
import { NavigationItemCustomField } from '../../../../../schemas';
import { Effect, VoidEffect } from '../../../../../types';
interface ICustomFieldModalProps {
    data: NavigationItemCustomField | null;
    isOpen: boolean;
    onClose: VoidEffect;
    onSubmit: Effect<NavigationItemCustomField>;
}
declare const CustomFieldModal: React.FC<ICustomFieldModalProps>;
export default CustomFieldModal;
