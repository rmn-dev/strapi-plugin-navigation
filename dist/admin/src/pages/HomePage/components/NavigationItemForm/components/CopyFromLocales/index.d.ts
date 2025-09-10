/// <reference types="react" />
import { NavigationSchema } from '../../../../../../api/validators';
import { NavigationItemFormSchema } from '../../utils/form';
type CopyFromLocalesProps = {
    availableLocale: string[];
    current: Partial<NavigationItemFormSchema>;
    currentNavigation: Pick<NavigationSchema, 'id' | 'documentId' | 'locale'>;
    setIsLoading: (isLoading: boolean) => void;
    setFormValuesItems: (values: any) => void;
};
export declare const CopyFromLocales: React.FC<CopyFromLocalesProps>;
export {};
