const Footer = () => {
    return (
        <footer className="brutal-border-thick border-l-0 border-r-0 border-b-0 py-8"
            style={{ background: "hsl(var(--foreground))", color: "hsl(var(--primary-foreground))" }}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="font-mono font-bold text-lg">
                        {"<SHIENG/>"}
                    </div>
                    <div className="font-mono text-sm opacity-70">
                        © 2026 All rights reserved
                    </div>
                    <div className="flex gap-4">
                        <span className="sticker sticker-pink text-xs">Full-Stack Developer</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
