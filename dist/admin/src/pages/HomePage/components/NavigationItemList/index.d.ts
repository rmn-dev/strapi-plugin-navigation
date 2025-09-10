import { FC } from 'react';
import { NavigationItemSchema } from '../../../../api/validators';
import { OnItemEditEffect, OnItemLevelAddEffect, OnItemSubmitEffect } from '../NavigationItemListItem';
interface Props {
    isParentAttachedToMenu?: boolean;
    items?: Array<NavigationItemSchema>;
    level?: number;
    levelPath?: string;
    onItemEdit: OnItemEditEffect;
    onItemLevelAdd: OnItemLevelAddEffect;
    onItemSubmit: OnItemSubmitEffect;
    displayFlat?: boolean;
    permissions: {
        canUpdate: boolean;
        canAccess: boolean;
    };
    structurePrefix: string;
    viewParentId?: number;
    locale: string;
}
export declare const List: FC<Props>;
export {};
