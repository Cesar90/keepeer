import { KeyboardEvent } from "react";

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
        type: "a";
        whatever: string
    }
    | {
        type: "b",
        something: string
    }
    | {
        type: "c",
        whoCares: string
    }

const getUnion = (result: A) => {
    if (result.type === "a") {
        result.whatever
    }
}

// B is a union
type B = "a" | "b" | "c"

// C is an enum.
enum C {
    A = "a",
    B = "b",
    C = "c"
}

export type Event =
    | {
        type: "click";
        event: MouseEvent
    }
    | {
        type: "focus";
        event: FocusEvent;
    }
    | {
        type: "keydown";
        event: KeyboardEvent
    };

type Fruit = "apple" | "banana" | "orange";

type BananaAndOrange = Extract<Fruit, "banana" | "orange">

type ClickEvent = Extract<Event, { type: "click" }>

type testsClick = [Expect<Equal<ClickEvent, { type: "click"; event: MouseEvent }>>]

type NoKeyDownEvents = Exclude<Event, { type: "keydown" }>

type testsClickExclude = [Expect<Equal<NoKeyDownEvents,
    { type: "click"; event: MouseEvent; }
    | { type: "focus"; event: FocusEvent; }>>]

const fakeDataDefaults = {
    String: "Default string",
    Int: 1,
    Float: 1.14,
    Boolean: true,
    ID: "id",
    obj: {
        String: "Default string",
    }
}

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

type EventTypeIndex = Event["type"]

type testsEventTypeIndex = [Expect<Equal<EventTypeIndex, "click" | "focus" | "keydown">>]

export const programModeEnumMap = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "1on1",
    SELF_DIRECTED: "selfDirected",
    PLANNED_ONE_ON_ONE: "planned1on1",
    PLANNED_SELF_DIRECTED: "plannedSelfDirected"
} as const

export type GroupProgram = typeof programModeEnumMap["GROUP"]
export type AnnouncementProgram = typeof programModeEnumMap["ANNOUNCEMENT"]
export type OneOnOneProgram = typeof programModeEnumMap["ONE_ON_ONE"]
export type SelfDirectedProgram = typeof programModeEnumMap["SELF_DIRECTED"]
export type PlannedOneOnOneProgram = typeof programModeEnumMap["PLANNED_ONE_ON_ONE"]
export type PlannedSelfDirectedProgram = typeof programModeEnumMap["PLANNED_SELF_DIRECTED"]

type testObjectConst = [
    Expect<Equal<GroupProgram, "group">>,
]

// export type IndividualProgram = typeof programModeEnumMap[
//     | "ONE_ON_ONE"
//     | "SELF_DIRECTED"
//     | "PLANNED_ONE_ON_ONE"
//     | "PLANNED_SELF_DIRECTED"
// ]

type ExmapleIndividualProgram = Exclude<
    keyof typeof programModeEnumMap,
    "GROUP" | "ANNOUNCEMENT"
>

export type IndividualProgram = typeof programModeEnumMap[ExmapleIndividualProgram]

type testsIndividualProgram = [
    Expect<Equal<
        IndividualProgram,
        "1on1" |
        "selfDirected" |
        "planned1on1" |
        "plannedSelfDirected"
    >>
]

const frontendToBackEnumMap = {
    singleModule: "SINGLE_MODULE",
    multiModule: "MULTI_MODULE",
    sharedModule: "SHARED_MODULE",
} as const;

type BackendModuleEnum = typeof frontendToBackEnumMap[keyof typeof frontendToBackEnumMap]

type testFrontendToBackEnumMap = [
    Expect<Equal<BackendModuleEnum, "SINGLE_MODULE" | "MULTI_MODULE" | "SHARED_MODULE">>
]

const fruits = ["apple", "banana", "orange"] as const;

type AppleOrBanana = typeof fruits[0 | 1];
type FruitFruits = typeof fruits[number]

type testsFruits = [
    Expect<Equal<AppleOrBanana, "apple" | "banana">>,
    Expect<Equal<Fruit, "apple" | "banana" | "orange">>
]

type RouteLiteral = `/${string}`

export const goToRoute = (route: RouteLiteral) => { };

// Should succeed
goToRoute("/users");
goToRoute("/")
goToRoute("/admin/users")

// Should error
// @ts-expect-error
goToRoute("users/1")

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
