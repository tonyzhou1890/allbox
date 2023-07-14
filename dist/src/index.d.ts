import array_randomSwap from './array.random-swap';
import array_swap from './array.swap';
import common_getTypeName from './common.get-type-name';
import string_camelize from './string.camelize';
declare const Allbox: {
    array: {
        randomSwap: typeof array_randomSwap;
        swap: typeof array_swap;
    };
    common: {
        getTypeName: typeof common_getTypeName;
    };
    string: {
        camelize: typeof string_camelize;
        hyphenate: (str: string) => string;
    };
};
export default Allbox;
