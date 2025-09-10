/// <reference types="react" />
import { NavigationItemSchema } from '../../../../api/validators';
import { Effect } from '../../../../types';
import { NavigationItemFormSchema } from '../NavigationItemForm';
export type OnItemReorderEffect = Effect<{
    item: NavigationItemFormSchema;
    newOrder: number;
}>;
export type OnItemLevelAddEffect = (event: MouseEvent, viewParentId?: number, isMenuAllowedLevel?: boolean, levelPath?: string, parentAttachedToMenu?: boolean, structureId?: string, maxOrder?: number) => void;
export type OnItemEditEffect = Effect<{
    item: NavigationItemFormSchema & {
        isMenuAllowedLevel?: boolean;
        isParentAttachedToMenu?: boolean;
    };
    levelPath: string;
    isParentAttachedToMenu?: boolean;
}>;
export type OnItemRemoveEffect = Effect<NavigationItemSchema>;
export type OnItemRestoreEffect = Effect<NavigationItemSchema>;
export type OnItemCollapseEffect = Effect<NavigationItemSchema>;
export type OnItemSubmitEffect = Effect<NavigationItemFormSchema>;
interface Props {
    isParentAttachedToMenu?: boolean;
    item: NavigationItemSchema;
    level?: number;
    levelPath?: string;
    onItemEdit: OnItemEditEffect;
    onItemLevelAdd: OnItemLevelAddEffect;
    onItemRemove: OnItemRemoveEffect;
    onItemRestore: OnItemRestoreEffect;
    onItemReOrder: OnItemReorderEffect;
    onItemToggleCollapse: OnItemCollapseEffect;
    onItemSubmit: OnItemSubmitEffect;
    displayFlat?: boolean;
    permissions: {
        canUpdate: boolean;
        canAccess: boolean;
    };
    isLast?: boolean;
    displayChildren?: boolean;
    structureId: string;
    viewParentId?: number;
    locale: string;
}
export declare const Item: React.FC<Props>;
export {};
