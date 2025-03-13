import Button from "@/components/Button";
import Link from "next/link";

export default async function Home() {

    return (
        <>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <h1 className="text-4xl font-extrabold">Article 11</h1>
                <Link href="/lab">
                    <Button variant="primary">Test lab</Button>
                </Link>
            </div>
        </>
    );
}
