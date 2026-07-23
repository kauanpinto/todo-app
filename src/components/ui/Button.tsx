interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
    variant?: "solid" | "outline";
    color?: "primary" | "neutral" | "danger";
    size?: "md" | "sm" | "xs";
}

function Button({
    children,
    onClick,
    disabled,
    type = "button",
    variant = "solid",
    color = "primary",
    size = "md",
}: ButtonProps) {
    const baseStyles =
        "w-full font-medium transition-all active:scale-95 disabled:opacity-50";

    const sizeStyles = {
        md: "py-3 rounded-lg",
        sm: "py-2 text-sm rounded-lg",
        xs: "py-1.5 text-xs rounded-md",
    };

    const colorStyles = {
        solid: {
            primary: "bg-blue-600 text-white hover:bg-blue-700",
            neutral: "bg-slate-600 text-white hover:bg-slate-700",
            danger: "bg-red-600 text-white hover:bg-red-700",
        },
        outline: {
            primary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
            neutral: "border border-slate-300 text-slate-700 hover:bg-slate-50",
            danger: "border border-red-600 text-red-600 hover:bg-red-50",
        },
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${sizeStyles[size]} ${
                colorStyles[variant][color]
            }`}
        >
            {children}
        </button>
    );
}

export default Button;
