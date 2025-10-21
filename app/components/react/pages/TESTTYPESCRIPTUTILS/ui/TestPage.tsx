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
