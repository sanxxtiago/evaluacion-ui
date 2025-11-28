// Layout.tsx
import { Outlet } from "react-router-dom";
import { LateralPanel } from "../components/LateralPanel";

export function MainLayout() {
    return (
        <div className="bg-gray-900 flex flex-row h-screen">
            <LateralPanel />
            <div className="flex flex-col w-full content-stretch">
                <div className="bg-gray-800 py-3 px-10">
                    <ol class="flex items-center w-full space-x-4">

                        <li class="flex w-full items-center text-fg-brand after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-subtle after:border-4 after:inline-block after:ms-4 after:rounded-full">
                            <span class="flex items-center justify-center w-10 h-10 bg-blue-200 text-blue-900 rounded-full lg:h-12 lg:w-12 shrink-0">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                </svg>
                            </span>
                        </li>

                        <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-500 after:border-4 after:inline-block after:ms-4 after:rounded-full">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-900 rounded-full lg:h-12 lg:w-12 shrink-0">
                                2
                            </span>
                        </li>

                        <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-500 after:border-4 after:inline-block after:ms-4 after:rounded-full">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-900 rounded-full lg:h-12 lg:w-12 shrink-0">
                                3
                            </span>
                        </li>

                        <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-500 after:border-4 after:inline-block after:ms-4 after:rounded-full">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-900 rounded-full lg:h-12 lg:w-12 shrink-0">
                                4
                            </span>
                        </li>

                        <li class="flex items-center">
                            <span class="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-900 rounded-full lg:h-12 lg:w-12 shrink-0">
                                5
                            </span>
                        </li>

                    </ol>





                </div>
                <div className="flex-1 overflow-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
