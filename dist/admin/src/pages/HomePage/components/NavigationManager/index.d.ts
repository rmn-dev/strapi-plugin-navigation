import { VoidEffect } from '../../../../types';
import { State } from './types';
interface Props {
    initialState: State;
    isOpened?: boolean;
    onClose?: VoidEffect;
}
export declare const NavigationManager: ({ initialState, isOpened, onClose }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
