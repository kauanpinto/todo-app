interface InputProps {
    value: string;
    onChange: (value: string) => void;
    type?: "text" | "email" | "password";
    placeholder?: string;
}

function Input({ value, onChange, type = "text", placeholder }: InputProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
        />
    );
}

export default Input;
