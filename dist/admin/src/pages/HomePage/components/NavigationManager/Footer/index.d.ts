/// <reference types="react" />
import { NavigationSchema } from '../../../../../api/validators';
import { VoidEffect } from '../../../../../types';
import { SetState, State } from '../types';
interface FooterBaseProps {
    end?: ActionProps;
    start?: ActionProps;
}
export type Footer = React.FC<{
    navigations: Array<NavigationSchema>;
    onClose?: VoidEffect;
    onReset: VoidEffect;
    onSubmit: VoidEffect;
    setState: SetState;
    state: State;
    disabled?: boolean;
    isLoading: boolean;
}>;
interface ActionProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: VoidEffect;
    variant: 'danger' | 'secondary' | 'tertiary' | 'default';
}
export declare const FooterBase: React.FC<FooterBaseProps>;
export {};
