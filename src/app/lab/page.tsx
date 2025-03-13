import Button from "@/components/Button";
import {prisma} from "@/lib/db";
import {addTask} from "@/lib/actions";

export default async function Home() {

    const tasks = await prisma.task.findMany();

    return (
        <>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <h1 className="text-4xl font-extrabold text-center">Debug and look for examples here</h1>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <h1>Example of component variants</h1>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tetiary Button</Button>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-10">
                <h1>Example of database usage</h1>
                <form action={addTask} className="space-x-2 h-4">
                    <input type="text" name="title" className="px-3 py-1 rounded border-1"/>
                    <Button type="submit" variant="primary">Add task</Button>
                </form>
            </div>
            <div className="flex flex-col items-center space-y-4 mt-10">
                {tasks.length > 0 ? (
                    <ul className="text-center">
                        {tasks.map((task) => (
                            <li key={task.id} className="mb-1">
                                - {task.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>- No task found -</p>
                )}
            </div>
        </>
    );
}
