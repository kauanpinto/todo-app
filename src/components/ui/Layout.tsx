interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex items-start justify-center bg-slate-100 px-4 py-10 md:items-center">
            {children}
        </div>
    );
}

export default Layout;
