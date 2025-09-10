import { UseQueryResult } from '@tanstack/react-query';
import { NavigationItemSchema } from '../../../api/validators';
export * from './parsers';
export declare const getPendingAction: (actions: Array<Pick<UseQueryResult, 'isPending'>>) => Pick<UseQueryResult, "isPending"> | undefined;
export declare const changeCollapseItemDeep: (item: NavigationItemSchema, isCollapsed: boolean) => NavigationItemSchema;
