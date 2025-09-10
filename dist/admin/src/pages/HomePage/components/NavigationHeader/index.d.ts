import React from 'react';
import { NavigationSchema } from '../../../../api/validators';
import { Effect } from '../../../../types';
interface Props {
    activeNavigation?: NavigationSchema;
    availableNavigations: NavigationSchema[];
    structureHasErrors?: boolean;
    structureHasChanged?: boolean;
    isSaving?: boolean;
    handleChangeSelection: Effect<NavigationSchema>;
    handleLocalizationSelection: Effect<string>;
    handleSave: Effect<void>;
    handleCachePurge: Effect<void>;
    permissions: {
        canUpdate?: boolean;
    };
    locale: {
        defaultLocale: string;
        restLocale: string[];
    };
    currentLocale?: string;
}
export declare const NavigationHeader: React.FC<Props>;
export {};
