import { NavigationInternalItemFormSchema } from '../../utils/form';
import { StrapiContentTypeItemSchema } from 'src/api/validators';
export declare const useChangeFieldsFromRelated: (values: NavigationInternalItemFormSchema, contentTypeItems: StrapiContentTypeItemSchema[] | undefined, setFormValuesItems: (values: any) => void) => void;
