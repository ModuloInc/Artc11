import Button from "@/components/Button";

export default function Home() {
    return (
        <div className="flex flex-col items-center space-y-4 mt-10">
            <h1>Example of component variants</h1>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="tertiary">Tetiary Button</Button>
        </div>
    );
}
