import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Input from "./Input";

interface PasswordInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

function PasswordInput({
    value,
    onChange,
    placeholder = "Digite sua senha",
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
                {showPassword ? (
                    <Eye className="h-5 w-5" />
                ) : (
                    <EyeOff className="h-5 w-5" />
                )}
            </button>
        </div>
    );
}

export default PasswordInput;
