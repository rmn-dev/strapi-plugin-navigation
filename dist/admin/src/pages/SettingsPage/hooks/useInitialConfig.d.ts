import { UiFormSchema } from '../schemas';
import { ConfigSchema } from '../../../schemas';
type UseInitialConfigParams = {
    config: ConfigSchema | undefined;
    setFormValue: (formValue: UiFormSchema) => void;
};
export declare const useInitialConfig: ({ config, setFormValue }: UseInitialConfigParams) => void;
export {};
