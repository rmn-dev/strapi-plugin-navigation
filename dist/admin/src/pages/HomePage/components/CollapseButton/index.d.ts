import { Effect } from '../../../../types';
interface Props {
    toggle: Effect<any>;
    collapsed?: boolean;
    itemsCount?: number;
}
export declare const CollapseButton: ({ toggle, collapsed, itemsCount }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
