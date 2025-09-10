export declare class NavigationError<T = unknown> extends Error {
    additionalInfo?: T | undefined;
    type: string;
    constructor(message: string, additionalInfo?: T | undefined);
}
export declare class FillNavigationError extends NavigationError {
    type: string;
}
export declare class InvalidParamNavigationError extends NavigationError {
    type: string;
}
