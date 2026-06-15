import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/contact";
import { departments, site } from "@/data/site";

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "99193bb2-a5d0-4b56-8083-ffe606f2d16f";

const initialState = {
  name: "",
  phone: "",
  email: "",
  department: "",
  message: "",
};

export function ContactForm({
  submitLabel = "Submit Form",
  whatsappLabel = "Send on WhatsApp",
}) {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [successMessage, setSuccessMessage] = useState({
    title: "Message sent!",
    text: "Thank you for contacting us. Our hospital team will get back to you soon.",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("submitted") === "true") {
      setSuccessMessage({
        title: "Message sent!",
        text: "Thank you for contacting us. Our hospital team will get back to you soon.",
      });
      setStatus("ok");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    if (!/^[\d +()-]{7,}$/.test(formData.phone)) {
      setStatus("error");
      setError("Please enter a valid phone number.");
      return false;
    }

    if (!formData.name.trim() || !formData.department || !formData.message.trim()) {
      setStatus("error");
      setError("Please fill in the required fields.");
      return false;
    }

    return true;
  };

  const handleWhatsApp = () => {
    if (!validateForm()) {
      return;
    }

    const url = buildWhatsAppUrl(site.whatsapp, formData);
    const popup = window.open(url, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.href = url;
    }

    setSuccessMessage({
      title: "WhatsApp opened!",
      text: "Your message is ready to send to our hospital team.",
    });
    setStatus("ok");
    setError("");
    setFormData(initialState);
  };

  const handleSubmit = (event) => {
    if (!validateForm()) {
      event.preventDefault();
      return;
    }

    setStatus("loading");
    setError("");
  };

  if (status === "ok") {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full gradient-brand text-2xl text-white">
          {"\u2713"}
        </div>
        <h3 className="mt-4 text-xl font-bold">{successMessage.title}</h3>
        <p className="mt-2 text-muted-foreground">{successMessage.text}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 font-semibold text-brand"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="subject" value={`New contact enquiry from ${site.shortName}`} />
      <input type="hidden" name="from_name" value={site.shortName} />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
      <input type="hidden" name="redirect" value="https://moryaplushospital.com/contact?submitted=true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <div>
        <label className="text-sm font-medium text-foreground/80">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department.slug} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground/80">Message</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Briefly describe your concern..."
          className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
        />
      </div>
      {error ? <p className="text-sm text-emergency">{error}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          value="email"
          disabled={status === "loading"}
          className="rounded-full gradient-brand py-3 font-semibold text-white shadow-soft transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Submitting..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          disabled={status === "loading"}
          className="rounded-full border border-brand px-4 py-3 font-semibold text-brand transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          {whatsappLabel}
        </button>
      </div>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
