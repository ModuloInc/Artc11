import VideoCard from "@/components/VideoCard";

export default async function Category() {

    return (
        <>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <h1 className="text-4xl font-extrabold">Category Page</h1>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-y-5 gap-x-5 mt-10 px-12">
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
                <VideoCard/>
            </div>
        </>
    );
}