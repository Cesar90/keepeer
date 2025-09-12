function NavBar() {
    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div
                className="px-3 py-3 lg:px-5 lg:pl-3 ">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <a href="/" className="flex ml-2 md:mr-24">
                            <img src="/static/img/cer-management-group-logo.svg" className="h-8 mr-3" alt="CER LOGO" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">CER</span>
                        </a>
                    </div>
                    <span className="text-white">
                        🚧 Ambiente de prueba TEST | You are development Mode Active
                    </span>

                    <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export {
    NavBar
}