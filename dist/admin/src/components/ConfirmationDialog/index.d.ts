/**
 *
 * Entity Details
 *
 */
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Effect } from '../../types';
interface Props {
    isVisible?: boolean;
    isActionAsync?: boolean;
    onConfirm: Effect<any>;
    onCancel: Effect<any>;
    header?: ReactNode;
    labelCancel?: ReactNode;
    labelConfirm?: ReactNode;
    iconConfirm?: ReactNode;
    mainIcon?: ReactNode;
}
export declare const ConfirmationDialog: FC<PropsWithChildren<Props>>;
export {};
