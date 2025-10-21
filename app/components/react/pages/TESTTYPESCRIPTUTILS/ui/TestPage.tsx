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
