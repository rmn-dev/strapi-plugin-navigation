import { FC } from 'react';
export interface ConfirmEffect {
    (): void;
}
export interface CancelEffect {
    (): void;
}
interface Props {
    onConfirm: ConfirmEffect;
    onCancel: CancelEffect;
}
export declare const ChangeLanguageDialog: FC<Props>;
export {};
