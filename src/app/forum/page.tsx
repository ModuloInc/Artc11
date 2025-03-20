import React from 'react';
import Link from "next/link";

export default function Forum() {
    return (<>
            <div className="mb-6 container flex justify-center">
                <div
                    className="border-l-2 border-r-2 border-b-2 border-gray-600 rounded-bl-3xl rounded-br-3xl py-5 w-75 max-w-md">
                    <h2 className="text-center text-3xl font-bold text-black">Forum</h2>
                </div>
            </div>
            <div className="p-4 min-h-screen">
                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                    {/* Climate & Environment */}
                    <Link href="/forum/Environment">
                        <div className="bg-pink-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-pink-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path
                                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                                    <path d="M3.22 10H11"/>
                                    <path d="M13 10h7.78"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Environment</p>
                        </div>
                    </Link>


                    {/* Technology */}
                    <Link href="/forum/Technology">
                        <div className="bg-blue-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-blue-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path d="M12 12v-2"/>
                                    <path d="M12 7v0"/>
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="m16 16-4-4"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Technology</p>
                        </div>
                    </Link>

                    {/* Democracy and Human Rights */}
                    <Link href="/forum/Democracy">
                        <div className="bg-yellow-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-yellow-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path d="M6 20h12"/>
                                    <path d="M6 16h12"/>
                                    <path d="M6 12h12"/>
                                    <path d="M6 8h12"/>
                                    <path d="M18 4H6"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Democracy</p>
                        </div>
                    </Link>
                    {/* Entertainment */}
                    <Link href="/forum/Entertainment">
                        <div className="bg-blue-200 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-blue-400 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="11" r="2"/>
                                    <path
                                        d="M19.9 7a9 9 0 0 0-12.9-1.1C4 8.7 3 11.3 3 14a2 2 0 0 0 2 2h.7c1.2 0 2.5-.4 3.3-1.2.8-.8 1.6-2 1.8-3.1.3.2.6.3 1.2.3.6 0 .9-.1 1.2-.3.2 1.1 1 2.3 1.8 3.1.8.8 2.1 1.2 3.3 1.2H19a2 2 0 0 0 2-2c0-2.7-1-5.3-4-7.1"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Entertainment</p>
                        </div>
                    </Link>
                    {/* Sports */}
                    <Link href="/forum/Sports">
                        <div className="bg-cyan-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-cyan-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="m4.93 4.93 4.24 4.24"/>
                                    <path d="m14.83 9.17 4.24-4.24"/>
                                    <path d="m14.83 14.83 4.24 4.24"/>
                                    <path d="m9.17 14.83-4.24 4.24"/>
                                    <circle cx="12" cy="12" r="4"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Sports</p>
                        </div>
                    </Link>
                    {/* International */}
                    <Link href="/forum/International">
                        <div className="bg-green-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-green-400 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="2" y1="12" x2="22" y2="12"/>
                                    <path
                                        d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">International</p>
                        </div>
                    </Link>

                    {/* Education */}
                    <Link href="/forum/Education">

                        <div className="bg-pink-50 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-pink-200 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Education</p>
                        </div>
                    </Link>

                    {/* Society */}
                    <Link href="/forum/Society">
                        <div className="bg-purple-100 rounded-xl p-4 flex flex-col items-center">
                            <div className="bg-purple-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                            </div>
                            <p className="text-center text-sm font-medium">Society</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}