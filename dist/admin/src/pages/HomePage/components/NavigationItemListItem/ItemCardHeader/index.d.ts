import { FC, MutableRefObject, ReactNode } from 'react';
import { VoidEffect } from '../../../../../types';
interface IProps {
    title: string;
    path?: string;
    icon: ReactNode;
    removed?: boolean;
    canUpdate: boolean;
    onItemRemove: VoidEffect;
    onItemEdit: VoidEffect;
    onItemRestore: VoidEffect;
    dragRef: MutableRefObject<HTMLHeadingElement>;
    isSearchActive?: boolean;
    isAttached: boolean;
}
export declare const ItemCardHeader: FC<IProps>;
export {};
