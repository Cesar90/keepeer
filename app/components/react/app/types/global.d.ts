/**
 *  Some utils type
 *  https://github.com/mike-north/types
 *  https://www.typescript-training.com/course/intermediate-v1
 *  https://github.com/tab-info/tab-info-extension
 */

/*
//This is more flexible
let d: {[k: string]: Date} = {}
//than this
let record: { [K in 'endOfWeek' | 'startOfWeek']: Date } = {
    endOfWeek: new Date(),
    startOfWeek: new Date(),
}
//I can't do it
record = d

//I can do it
d = record
*/

type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

type PickWindowProperties<Keys extends keyof globalThis.Window> = {
    [key in Keys]: globalThis.Window[key]
}

type PartOfWindow = {
    [key in 'document' | 'navigator' | 'setTimeout']: globalThis.Window[key]
}

type PartOfWindowGeneric = PickWindowProperties<'document' | 'navigator' | 'setTimeout'>

type PickProperties<ValueType, keys extends keyof ValueType> = {
    [key in keys]: ValueType[key]
}
type PartOfWindowPick = PickProperties<globalThis.Window, 'document' | 'navigator' | 'setTimeout'>

type ArtFeaturesGlobal = 'cabin' | 'tree' | 'sunset'
type ColorGlobal =
    | 'darkSienna'
    | 'sapGreen'
    | 'titanicumWhite'
    | 'prussianBlue'

type ArtMethodNamesGlobal = `paint${Capitalize<ColorGlobal>}${Capitalize<ArtFeaturesGlobal>}`

interface DataStateGlobal {
    digits: number[]
    names: string[]
    flags: Record<'darkMode' | 'mobile', boolean>
}

type DataSDKGlobal = {
    // The mapped type
    [K in keyof DataStateGlobal as `set${Capitalize<K>}`]: (arg: DataStateGlobal[K]) => void
}

type DocKeysGlobal = Extract<keyof Document, `query${string}`>
type KeyFilteredDocGlobal = {
    [K in DocKeysGlobal]: Document[K]
}

// type ValueFilteredDocGlobal = {
//     [K in keyof Document]: Document[K] extends (
//         ...args: any[]
//     ) => Element | Element[] ? Document[K] : never
// }

interface ColorGlobal2 {
    red: string;
    green: number;
    blue: string;
}

type FilteredKeysGlobal2<ToFilter, Condition> = {
    [P in keyof ToFilter]: ToFilter[P] extends Condition ? P : never
}[keyof ToFilter] & keyof ToFilter

// In OR operation never will be removed
type Foo = number | never

type RelevantsColorKeysGlobal2 = FilteredKeysGlobal2<ColorGlobal2, number>

type FilteredKeysGlobal<T, U> = {
    [P in keyof T]: T[P] extends U ? P : never
}[keyof T] & keyof T

type ElementFunctionGlobal = (...args: any[]) => Element | Element[]

type RelevantDocumentKeysGlobal = FilteredKeysGlobal<
    Document,
    ElementFunctionGlobal
>

type ValueFilteredDocGlobal = Pick<Document, RelevantDocumentKeysGlobal>

/*
    function load(dataSDK: DataSDKGlobal){
        dataSDK.setDigits([14])
    }
*/

/**
 * const fruiteCatalog: Dict<Fruit> = {}
 * fruiteCatalog.apple
 *
    type IFruit = {
        name: string;
        color: string;
        mass: number;
    }
    type Dict<T> = { [k: string]: T }

 */

/*
    type Fruit = {
        name: string;
        color: string;
        mass: number;
    }

    //mapped type
    type MyRecord = { [FruitKey in "apple" | "cherry"]: Fruit}
    type MyTypeRecord<KeyType, ValueType> = {[ key in  KeyType]: ValueType}

    function printFruitCatalog(fruitCatalog: MyRecord){
        fruitCatalog.cherry
        fruitCatalog.apple

        //Property 'pineapple' does not exist on type 'MyRecord'
        fruitCatalog.pineapple
    }
*/
// type ConstructorArg<C> = C extends {
//     new(arg: infer A): any
// }
//     ? A
//     : never
/**
 * Extract the arguments from a class constructor
 *
 * @public
 * @example
 * ```ts
 * class Foo {
 *  constructor(a: string, b: number[], c: Promise<boolean>) {}
 * }
 * const x: ConstructorArgs<typeof Foo> // [string, number[], Promise<boolean>]
 *  = ['hello world', [1, 2, 3], Promise.resolve(false) ];
 * ```
 */
type ConstructorArg<
    K extends new (...args: any[]) => any
> = K extends new () => any
    ? never[]
    : K extends new (a: infer A) => any
    ? [A]
    : K extends new (a: infer A, b: infer B) => any
    ? [A, B]
    : K extends new (a: infer A, b: infer B, c: infer C) => any
    ? [A, B, C]
    : K extends new (a: infer A, b: infer B, c: infer C, d: infer D) => any
    ? [A, B, C, D]
    : K extends new (
        a: infer A,
        b: infer B,
        c: infer C,
        d: infer D,
        e: infer E
    ) => any
    ? [A, B, C, D, E]
    : never;

/**
 * Converts a type string from a snake_case string to PascalCase.
 * This will convert all snake case strings including strings with no underscores, or many
 */
// type PascaleFromSnake<String extends string> = String extends `${infer First}_${infer Rest}` ? `${Capitalize<Lowercase<First>>}${PascaleFromSnake<Rest>}` : Capitalize<Lowercase<String>>

// /**
//  * Converts a type string from a snake_case string to camelCase.
//  * This will convert all snake case strings including strings with no underscores, or many
//  */
// type CamelFromSnake<String extends string> = String extends `${infer First}_${infer Rest}` ? `${Lowercase<First>}${PascaleFromSnake<Rest>}` : Lowercase<String>

// type InternalMapCamelKeys<T, deep extends boolean> = {
//     [key in keyof T & string]: {
//         [transformed in CamelFromSnake<key & string>]: deep extends true ? SnakeToCamelKeys<T[key], deep> : T[key]
//     }
// }

// // Creates a union of all value types within the map. This is used to extract out the values from above
// type CombineAll<T> = T extends { [name in keyof T]: infer Type } ? Type : never

// /**
//  * Transforms an object with snake_case keys to an object with camelCase keys.
//  *
//  * If deep is true, this also transforms the keys of internal classes too.
//  */
// type SnakeToCamelKeys<T, deep extends boolean = false> = T extends object ? CombineAll<InternalMapCamelKeys<T, deep>> : T

type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
    : S;

type SnakeToCamelKeys<T> = {
    [K in keyof T as SnakeToCamelCase<K & string>]: T[K]
};

interface UserLogged {
    user_id: number;
    groups: string[];
    permissions: string[];
    is_superuser: boolean;
    superadmin: boolean;
}

interface GlobalsCommonSchema {
    isLoading: boolean;
    error?: string;
}

interface IResultPagination<T> {
    count: number;
    next: string | null;
    previous: string | null;
    page_size: number;
    results: T[];
}

interface Window {
    csrfToken: string;
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames
}

// declare module "*.svg" {
//     const content: any;
//     export default content;
// }
declare module '*.svg'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
// declare module '*.svg' {
//     import React from 'react';

//     const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
//     export default SVG;
// }

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
}
