/// <reference types="react" />
import { NavigationItemSchema, NavigationSchema } from '../../../api/validators';
export declare const useSearch: (currentNavigation: NavigationSchema | undefined) => {
    searchValue: string;
    setSearchValue: import("react").Dispatch<import("react").SetStateAction<{
        value: string;
        index: number;
    }>>;
    isSearchEmpty: boolean;
    filteredList: NavigationItemSchema[];
};
