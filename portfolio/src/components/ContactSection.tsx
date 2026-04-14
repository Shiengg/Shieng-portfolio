const ContactSection = () => {
    const socials = [
        { label: "GitHub", href: "https://github.com/Shiengg", color: "neon-green" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/tann-tn/", color: "neon-blue" },
        { label: "Email", href: "mailto:nhattanwork2004@gmail.com", color: "neon-yellow" },
    ];

    return (
        <section id="contact" className="contact-section">
            <div className="contact-section__accent" aria-hidden="true" />
            <div className="container mx-auto px-6 md:px-10">
                <div className="contact-section__frame">
                    <h2 className="contact-section__headline" data-echo="Backed by me, all the way">
                        Backed by me, all the way
                    </h2>

                    <div className="contact-section__label-row" aria-label="Social links">
                        <span className="contact-section__label">SOCIAL STUFF</span>
                        <span className="contact-section__divider" aria-hidden="true" />
                    </div>

                    <div className="contact-section__actions">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                                className={`contact-section__button contact-section__button--${social.color}`}
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;