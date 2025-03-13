export default function Button({children="Button", variant = "primary", type="button"}) {
    const styles = "px-4 py-2 rounded-md font-medium transition-all cursor-pointer";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        tertiary: "bg-red-500 text-white hover:bg-red-600",
    };

    return (  // @ts-ignore
        <button type={type} className={`${styles} ${variants[variant]}`}>
            {children}
        </button>
    );
}