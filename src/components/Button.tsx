// @ts-ignore
export default function Button({ children, variant = "primary" }) {
  const styles = "px-4 py-2 rounded-md font-medium transition-all";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    tertiary: "bg-red-500 text-white hover:bg-red-600",
  };

  return (  // @ts-ignore
    <button className={`${styles} ${variants[variant]}`}>
      {children}
    </button>
  );
}