import Image from "next/image";

export default function VideoCard({children = "Video"}) {

    return (
        <div
            className="relative m-0 flex h-50 w-40 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div
                className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <Image
                    src="/temp_video_card.png"
                    alt="Description de l'image"
                    className="block h-full w-full object-cover object-center"
                    layout="fill"
                />

            </div>
            <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4">
                <h1 className="font-serif text-xl font-bold text-white shadow-xl">{children}</h1>
            </div>
        </div>
    );
}