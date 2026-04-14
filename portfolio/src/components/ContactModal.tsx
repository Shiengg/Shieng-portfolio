import { FormEvent, useEffect, useState } from "react";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
};
const AUTO_CLOSE_MS = 5000;

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isSubmitted) {
      return;
    }

    const initializeCountdownTimer = window.setTimeout(() => {
      setCountdown(5);
    }, 0);
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remainingMs = Math.max(0, AUTO_CLOSE_MS - elapsed);
      setCountdown(Math.ceil(remainingMs / 1000));

      if (remainingMs <= 0) {
        window.clearInterval(timer);
        setErrors({});
        setIsSubmitted(false);
        onClose();
      }
    }, 100);

    return () => {
      window.clearTimeout(initializeCountdownTimer);
      window.clearInterval(timer);
    };
  }, [isOpen, isSubmitted, onClose]);

  if (!isOpen) {
    return null;
  }

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 12) {
      nextErrors.message = "Message must be at least 12 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setErrors({});
    setFormData(initialFormData);
  };

  const handleClose = () => {
    setErrors({});
    setIsSubmitted(false);
    setCountdown(5);
    onClose();
  };

  return (
    <div className="contact-modal-backdrop" onClick={handleClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="contact-modal-close" aria-label="Close contact modal" onClick={handleClose}>
          X
        </button>

        <div className="contact-modal-header">
          <h2 id="contact-modal-title" className="contact-modal-title">
            Get in touch
          </h2>
          <p className="contact-modal-subtitle">
            Have a project or an idea? Drop me a message and I will get back to you soon.
          </p>
        </div>

        {isSubmitted ? (
          <div className="contact-modal-success" role="status">
            <p className="contact-modal-success-title">Message sent.</p>
            <p className="contact-modal-success-text">Thanks for reaching out. I will reply within 1-2 business days.</p>
            <p className="contact-modal-countdown-label">Auto closing in {countdown}s</p>
            <div className="contact-modal-countdown-track" aria-hidden="true">
              <div className="contact-modal-countdown-fill" />
            </div>
          </div>
        ) : (
          <form className="contact-modal-form" onSubmit={handleSubmit} noValidate>
            <label className="contact-modal-label" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              className={`contact-modal-input ${errors.name ? "is-error" : ""}`}
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            />
            {errors.name ? <p className="contact-modal-error">{errors.name}</p> : null}

            <label className="contact-modal-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@email.com"
              className={`contact-modal-input ${errors.email ? "is-error" : ""}`}
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
            {errors.email ? <p className="contact-modal-error">{errors.email}</p> : null}

            <label className="contact-modal-label" htmlFor="contact-message">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell me about your project..."
              className={`contact-modal-input contact-modal-textarea ${errors.message ? "is-error" : ""}`}
              value={formData.message}
              onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            />
            {errors.message ? <p className="contact-modal-error">{errors.message}</p> : null}

            <button type="submit" className="contact-modal-submit">
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
