import React from 'react';
import { Effect } from '../../types';
interface IProps {
    onChange: Effect<string[]>;
    initialValue?: string[];
    id?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
}
declare const TextArrayInput: React.FC<IProps>;
export default TextArrayInput;
