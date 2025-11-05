import { KeyboardEvent } from 'react';
import { S } from 'ts-toolbelt';

const myFunc = () => {
    return 'Hello';
};

type MyFunc = typeof myFunc

type ReturnValue = ReturnType<MyFunc>

/**
 * How do we extract MyFuncReturn from myFunc?
 */
type MyFuncReturn = ReturnType<typeof myFunc>

type tests = [Expect<Equal<MyFuncReturn, string>>]

const makeQuery = (
    url: string,
    opts?: {
        method?: string;
        headers?: {
            [key: string]: string;
        };
        body?: string;
    },
) => { };

type MakeQueryParameters = Parameters<typeof makeQuery>
type MakeQueryParametersSecondPararemtns = MakeQueryParameters[1];

type test = [
    Expect<
        Equal<
            MakeQueryParameters,
            [
                url: string,
                opts?: {
                    method?: string;
                    headers?: {
                        [key: string]: string;
                    };
                    body?: string;
                }
            ]
        >
    >
]

const getUser = () => {
    return Promise.resolve({
        id: '123',
        name: 'John',
        email: 'jonh@example.com',
    });
};

type GetUserPromise = ReturnType<typeof getUser>
type ReturnValueGetUser = Awaited<GetUserPromise>

type testsGetUSer = [
    Expect<Equal<ReturnValueGetUser, { id: string, name: string, email: string }>>
]

const testingFramework = {
    vitest: {
        label: 'Vitest',
    },
    jest: {
        label: 'Jest',
    },
    mocha: {
        label: 'Mocha',
    },
};

type TestingFramework = keyof typeof testingFramework

type testTestingFramework = [
    Expect<
        Equal<TestingFramework, 'vitest' | 'jest' | 'mocha'>
    >
]

/**
 * It's important to understand the terminology around unions:
 *
 * One of the type declarations below is a union
 * One of the type declarations below is a discriminated union.
 * One of the type declarations below is an enum
 *
 * Which is which?
*/

// Discrimination union
type A =
    | {
        type: 'a';
        whatever: string
    }
    | {
        type: 'b',
        something: string
    }
    | {
        type: 'c',
        whoCares: string
    }

const getUnion = (result: A) => {
    if (result.type === 'a') {
        // result.whatever;
    }
};

// B is a union
type B = 'a' | 'b' | 'c'

// C is an enum.
enum C {
    A = 'a',
    B = 'b',
    C = 'c'
}

export type Event =
    | {
        type: 'click';
        event: MouseEvent
    }
    | {
        type: 'focus';
        event: FocusEvent;
    }
    | {
        type: 'keydown';
        event: KeyboardEvent
    };

type Fruit = 'apple' | 'banana' | 'orange';

type BananaAndOrange = Extract<Fruit, 'banana' | 'orange'>

type ClickEvent = Extract<Event, { type: 'click' }>

type testsClick = [Expect<Equal<ClickEvent, { type: 'click'; event: MouseEvent }>>]

type NoKeyDownEvents = Exclude<Event, { type: 'keydown' }>

type testsClickExclude = [Expect<Equal<NoKeyDownEvents,
    { type: 'click'; event: MouseEvent; }
    | { type: 'focus'; event: FocusEvent; }>>]

const fakeDataDefaults = {
    String: 'Default string',
    Int: 1,
    Float: 1.14,
    Boolean: true,
    ID: 'id',
    obj: {
        String: 'Default string',
    },
};

type Example = typeof fakeDataDefaults['obj']['String']

type FakeDataDefaults = typeof fakeDataDefaults;

type StringType = FakeDataDefaults['String']
type IntType = FakeDataDefaults['Int']
type FloatType = FakeDataDefaults['Float']
type BooleanType = FakeDataDefaults['Boolean']
type IDType = FakeDataDefaults['ID']

type testFakeDataDefaults = [
    Expect<Equal<StringType, string>>,
    Expect<Equal<IntType, number>>,
    Expect<Equal<FloatType, number>>,
    Expect<Equal<BooleanType, boolean>>,
    Expect<Equal<IDType, string>>,
]

type EventTypeIndex = Event['type']

type testsEventTypeIndex = [Expect<Equal<EventTypeIndex, 'click' | 'focus' | 'keydown'>>]

export const programModeEnumMap = {
    GROUP: 'group',
    ANNOUNCEMENT: 'announcement',
    ONE_ON_ONE: '1on1',
    SELF_DIRECTED: 'selfDirected',
    PLANNED_ONE_ON_ONE: 'planned1on1',
    PLANNED_SELF_DIRECTED: 'plannedSelfDirected',
} as const;

export type GroupProgram = typeof programModeEnumMap['GROUP']
export type AnnouncementProgram = typeof programModeEnumMap['ANNOUNCEMENT']
export type OneOnOneProgram = typeof programModeEnumMap['ONE_ON_ONE']
export type SelfDirectedProgram = typeof programModeEnumMap['SELF_DIRECTED']
export type PlannedOneOnOneProgram = typeof programModeEnumMap['PLANNED_ONE_ON_ONE']
export type PlannedSelfDirectedProgram = typeof programModeEnumMap['PLANNED_SELF_DIRECTED']

type testObjectConst = [
    Expect<Equal<GroupProgram, 'group'>>,
]

// export type IndividualProgram = typeof programModeEnumMap[
//     | "ONE_ON_ONE"
//     | "SELF_DIRECTED"
//     | "PLANNED_ONE_ON_ONE"
//     | "PLANNED_SELF_DIRECTED"
// ]

type ExmapleIndividualProgram = Exclude<
    keyof typeof programModeEnumMap,
    'GROUP' | 'ANNOUNCEMENT'
>

export type IndividualProgram = typeof programModeEnumMap[ExmapleIndividualProgram]

type testsIndividualProgram = [
    Expect<Equal<
        IndividualProgram,
        '1on1' |
        'selfDirected' |
        'planned1on1' |
        'plannedSelfDirected'
    >>
]

const frontendToBackEnumMap = {
    singleModule: 'SINGLE_MODULE',
    multiModule: 'MULTI_MODULE',
    sharedModule: 'SHARED_MODULE',
} as const;

type BackendModuleEnum = typeof frontendToBackEnumMap[keyof typeof frontendToBackEnumMap]

type testFrontendToBackEnumMap = [
    Expect<Equal<BackendModuleEnum, 'SINGLE_MODULE' | 'MULTI_MODULE' | 'SHARED_MODULE'>>
]

const fruits = ['apple', 'banana', 'orange'] as const;

type AppleOrBanana = typeof fruits[0 | 1];
type FruitFruits = typeof fruits[number]

type testsFruits = [
    Expect<Equal<AppleOrBanana, 'apple' | 'banana'>>,
    Expect<Equal<Fruit, 'apple' | 'banana' | 'orange'>>
]

type RouteLiteral = `/${string}`

export const goToRoute = (route: RouteLiteral) => { };

// Should succeed
goToRoute('/users');
goToRoute('/');
goToRoute('/admin/users');

// Should error
// @ts-expect-error
goToRoute('users/1');

type Routes = '/users' | '/users/:id' | '/posts' | '/posts/:id';

type DynamicRoutes = Extract<Routes, `${string}:${string}`>

type testsDynamicRoutes = [Expect<Equal<DynamicRoutes, '/users/:id' | '/posts/:id'>>]

type BreadType = 'rye' | 'brown' | 'white'

type Filling = 'cheese' | 'ham' | 'salami'

type Sandwich = `${BreadType} sandwich with ${Filling}`

type testSandwich = [
    Expect<Equal<
        Sandwich,
        | 'rye sandwich with cheese'
        | 'rye sandwich with ham'
        | 'rye sandwich with salami'
        | 'brown sandwich with cheese'
        | 'brown sandwich with ham'
        | 'brown sandwich with salami'
        | 'white sandwich with cheese'
        | 'white sandwich with ham'
        | 'white sandwich with salami'
    >>
]

type Path = 'Users/John/Documents/notes.txt'

type SplitPath = S.Split<Path, '/'>

type testsPath = [
    Expect<Equal<SplitPath, ['Users', 'John', 'Documents', 'notes.txt']>>
]

type TemplateLiteralKey = `${'user' | 'post' | 'comment'}${'Id' | 'Name'}`

type ObjectOfKeys = Record<TemplateLiteralKey, string>

type testsObjectKeys = [
    Expect<
        Equal<
            ObjectOfKeys,
            {
                userId: string;
                userName: string;
                postId: string;
                postName: string;
                commentId: string;
                commentName: string;
            }
        >
    >
]

type EventUnion = 'log_in' | 'log_out' | 'sign_up'

type ObjectOfKeysEventUnion = Record<Uppercase<EventUnion>, string>

type testsEventUnion = [
    Expect<Equal<ObjectOfKeysEventUnion, {
        LOG_IN: string;
        LOG_OUT: string;
        SIGN_UP: string
    }>>
]

export const TypePurchases = {
    firstSelfHostLicensePurchase: 'first_purchase',
    renewalSelfHost: 'renewal_self',
    monthlySubscription: 'monthly_subscription',
    annualSubscription: 'annual_subscription',
} as const;

type TypePurchasesValueOF = ValueOf<typeof TypePurchases>

export type MetadataGatherWireTransferKeys = `${ValueOf<typeof TypePurchases>}_alt_payment_method`

export type CustomerMetadaGatherWireTransfer = Partial<
    Record<MetadataGatherWireTransferKeys, string>
>

type ReturnWhatIPassIn<T> = T

type testReturnWhatIPassIn = [
    Expect<Equal<ReturnWhatIPassIn<1>, 1>>,
    Expect<Equal<ReturnWhatIPassIn<'1'>, '1'>>,
    Expect<Equal<ReturnWhatIPassIn<true>, true>>,
    Expect<Equal<ReturnWhatIPassIn<false>, false>>,
    Expect<Equal<ReturnWhatIPassIn<null>, null>>,
]

type Maybe<T> = T | null | undefined

type ExampleMaybe = Maybe<string>

type testsMaybe = [
    Expect<Equal<Maybe<string>, string | null | undefined>>,
    Expect<Equal<Maybe<number>, number | null | undefined>>,
    Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
    Expect<Equal<Maybe<null>, null | undefined>>,
]

type AddRoutePrefix<TRoute extends string> = `/${TRoute}`

type testsAddRoutePrefix = [
    Expect<Equal<AddRoutePrefix<''>, '/'>>,
    Expect<Equal<AddRoutePrefix<'about'>, '/about'>>,
    Expect<Equal<AddRoutePrefix<'about/team'>, '/about/team'>>,
    Expect<Equal<AddRoutePrefix<'blog'>, '/blog'>>,
    // @ts-expect-error
    AddRoutePrefix<boolean>,
    // @ts-expect-error
    AddRoutePrefix<number>
]

type MaybeError = Error | undefined

type CreateDataShape<TData, TError extends MaybeError = undefined> = {
    data: TData,
    error: TError
}

type testsShapeError = [
    Expect<Equal<
        CreateDataShape<string, TypeError>,
        {
            data: string;
            error: TypeError;
        }
    >>,
    Expect<Equal<
        CreateDataShape<number, TypeError>,
        {
            data: number;
            error: TypeError;
        }
    >>,
    Expect<Equal<
        CreateDataShape<boolean, TypeError>,
        {
            data: boolean;
            error: TypeError;
        }
    >>,
    Expect<Equal<
        CreateDataShape<string>,
        {
            data: string;
            error: undefined;
        }
    >>
]

type GetParametersAndReturnType<T extends (...args: any) => any> = {
    params: Parameters<T>;
    returnValue: ReturnType<T>;
}

type testsGetParametersAndReturnType = [
    Expect<Equal<GetParametersAndReturnType<() => string>, { params: []; returnValue: string }>>,
    Expect<Equal<GetParametersAndReturnType<(s: string) => string>, { params: [string]; returnValue: string }>>,
    Expect<Equal<GetParametersAndReturnType<(s: string) => void>, { params: [string]; returnValue: void }>>,
    Expect<Equal<GetParametersAndReturnType<(n: number, b: boolean) => number>, { params: [number, boolean]; returnValue: number }>>,
]

export type MaybeExclude<T extends {}> = T | null | undefined

const whatever: {} = '123'

type testsMaybeExclude = [
    // @ts-expect-error
    MaybeExclude<null>,
    // @ts-expect-error
    MaybeExclude<undefined>,
    MaybeExclude<string>,
    MaybeExclude<false>,
    MaybeExclude<0>,
    MaybeExclude<"">,
    MaybeExclude<{
        wow: true;
    }>,
]

// Rest Array can be as long you want or as short you want
// First T works for ["a"]
// ...Array<T> works for ["a", "b", "c"]
type NonEmptyArray<T> = [T, ...Array<T>]

export const makeEnum = (values: NonEmptyArray<string>) => { };

makeEnum(["a"])
makeEnum(["a", "b", "c"])

// @ts-expect-error
makeEnum([])

// type YouSayGoodbyeAndISayHello<T> = T extends "hello" ? "goodbye" : "hello"
type YouSayGoodbyeAndISayHello<T> = T extends "hello" | "goodbye"
    ? T extends "hello"
    ? "goodbye"
    : "hello"
    : never

type testsYouSayGoodbyeAndISayHello = [
    Expect<Equal<YouSayGoodbyeAndISayHello<"hello">, "goodbye">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"goodbye">, "hello">>,
    Expect<Equal<YouSayGoodbyeAndISayHello<"alright pal">, never>>,
]

// type GetDataValues<T> = T extends { data: any } ? T["data"] : never
type GetDataValues<T> = T extends { data: infer TData } ? TData : never

type testsGetDataValues = [
    Expect<Equal<GetDataValues<{ data: "hello" }>, "hello">>,
    Expect<Equal<GetDataValues<{ data: { name: "hello" } }>, { name: "hello" }>>,
    Expect<Equal<GetDataValues<{ data: { name: "hello"; age: 20 } }>, { name: "hello"; age: 20 }>>,
]

interface MyComplexInterface<Event, Context, Name, Point> {
    getEvent: () => Event;
    getContext: () => Context;
    getName: () => Name;
    getPoint: () => Point;
}

type ExampleMyComplexInterface = MyComplexInterface<
    "click",
    "window",
    "my-event",
    { x: 12, y: 14 }
>

type GetPoint<T> = T extends MyComplexInterface<infer TClick, infer TWindow, infer TEvent, infer TPoint>
    ? TPoint
    : never;

type Example2 = GetPoint<MyComplexInterface<1, 2, 3, 4>>

type testsMyComplexInterface = [Expect<Equal<GetPoint<ExampleMyComplexInterface>, { x: 12, y: 14 }>>]

type ArrayOfNames = [
    "Matt Pocock",
    "Jimi Hendrix",
    "Eric Clapton",
    "John Mayer",
    "BB King"
]

/**
 * This is an alternative way of doing it, using S.Split
 */

// type GetSurname<T extends string> = S.Split<T, " ">[1]
type GetSurname<T> = T extends `${infer First} ${infer Last}` ? Last : never;

type testsArrayOfNames = [
    Expect<Equal<GetSurname<ArrayOfNames[0]>, "Pocock">>,
    Expect<Equal<GetSurname<ArrayOfNames[1]>, "Hendrix">>,
    Expect<Equal<GetSurname<ArrayOfNames[2]>, "Clapton">>,
    Expect<Equal<GetSurname<ArrayOfNames[3]>, "Mayer">>,
    Expect<Equal<GetSurname<ArrayOfNames[4]>, "King">>,
]

const getServerSideProps = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1")
    const json: { title: string } = await data.json()
    return {
        props: {
            json,
        },
    };
}

type InferPropsFromServerSideFunctions<T> = T extends () => Promise<{ props: infer P }> ? P : never

type PropsGetServerSideProps = InferPropsFromServerSideFunctions<typeof getServerSideProps>

type testsInferPropsFromServerSideFunctions = [
    Expect<
        Equal<
            InferPropsFromServerSideFunctions<typeof getServerSideProps>,
            { json: { title: string } }
        >
    >
]

const parse1 = {
    parse: () => 1
}

const parse2 = () => "123"

const parse3 = {
    extract: () => true
}

// type GetParseResult<T> = T extends {
//     parse: () => infer TResult
// } ? TResult
//     : T extends () => infer TResult
//     ? TResult
//     : T extends {
//         extract: () => infer TResult;
//     }
//     ? TResult
//     : never;

type GetParseResult<T> = T extends
    | {
        parse: () => infer TResult;
    }
    | {
        extract: () => infer TResult;
    }
    | (() => infer TResult)
    ? TResult
    : never

type testsGetParseResult = [
    Expect<Equal<GetParseResult<typeof parse1>, number>>,
    Expect<Equal<GetParseResult<typeof parse2>, string>>,
    Expect<Equal<GetParseResult<typeof parse3>, boolean>>,
]

type FruitUnion = "apple" | "banana" | "orange"

type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;

// type AppleOrBananaInfer = FruitUnion extends infer T
//     ? T extends "apple" | "banana"
//     ? T
//     : never
//     : never;

// type AppleOrBananaUnion = FruitUnionString extends "apple" | "bannana" ? FruitUnionString : never
type AppleOrBananaUnion = GetAppleOrBanana<FruitUnion>

type testsAppleOrBananaUnion = [Expect<Equal<AppleOrBananaUnion, "apple" | "banana">>]

/**
 * Use Mapped Types to Create an Object from a Union
*/
type RouteUnion = "/" | "/about" | "/admin" | "/admin/users";

// type RoutesObject = {
//     [index: string]: string
// }
// type RouteObject = Record<string, string>;

type RoutesObject = {
    [R in RouteUnion]: R
}

// Manually we add one by one
// type RoutesObject = {
//     [R in "/" | "wow"] : R
// }

type testsRoutesObject = [
    Expect<
        Equal<
            RoutesObject,
            {
                "/": "/",
                "/about": "/about",
                "/admin": "/admin",
                "/admin/users": "/admin/users"
            }
        >
    >
]

const LoginPage = () => {
    return (
        <div
            data-testid="HomePage"
        >
            TEST
        </div>
    );
};

export default LoginPage;
