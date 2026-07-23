interface CardProps {
    children: React.ReactNode;
}

function Card({ children }: CardProps) {
    return (
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            {children}
        </div>
    );
}

export default Card;
