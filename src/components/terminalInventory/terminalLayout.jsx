import { DashBoardLayout } from "../global/dashboardLayout"

export const TerminalLayout =({
    title,
    children
})=>{
    return(
        <DashBoardLayout>
            <div>
                <nav className="bg-grey-light w-full rounded-md">
                    <ol className="list-reset flex mb-4 items-center">
                        <li>
                        <a
                            href="#"
                            className="text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            >Dashboard</a
                        >
                        </li>
                        <li>
                        <span className="text-xs mx-2 text-neutral-500 dark:text-neutral-400 text-primary">/</span>
                        </li>
                        <li>
                        <a
                            href="#"
                            className="text-sm text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                            >Terminal Inventory</a
                        >
                        </li>
                        <li>
                        <span className="text-xs mx-2 text-neutral-500 dark:text-neutral-400 text-primary">/</span>
                        </li>
                        <li className="text-sm text-neutral-500 dark:text-neutral-400">{title}</li>
                    </ol>
                </nav>
                <div className="w-full p-4 rounded-sm bg-cl">
                    {children}
                </div>
            </div>
        </DashBoardLayout>
    )
}