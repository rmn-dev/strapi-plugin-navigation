import { FC } from 'react';
import { Effect } from '../../../../types';
interface Props {
    handleCancel: Effect<any>;
    handleSubmit?: Effect<any>;
    submitDisabled?: boolean;
    canUpdate?: boolean;
}
export declare const NavigationItemPopupFooter: FC<Props>;
export {};
