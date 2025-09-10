import { z } from 'zod';
export declare const formSchema: ({ alreadyUsedNames }: {
    alreadyUsedNames: string[];
}) => z.ZodObject<{
    name: z.ZodIntersection<z.ZodString, z.ZodEffects<z.ZodString, string, string>>;
    visible: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    visible: boolean;
}, {
    name: string;
    visible: boolean;
}>;
