import { useState, type FormEvent } from "react";
import { contact, site } from "../content/site";
import { MarkRule } from "./MarkRule";
import { ScrollType } from "./motion/ScrollType";

const enquiryEndpoint = (import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined)?.trim() || "";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const enquiryType = String(data.get("enquiryType") || contact.enquiryTypes[0]);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const country = String(data.get("country") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    setError("");

    if (enquiryEndpoint) {
      setSending(true);
      try {
        const response = await fetch(enquiryEndpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        const payload = (await response.json().catch(() => null)) as
          | { ok?: boolean; error?: string; message?: string }
          | null;
        if (!response.ok || !payload?.ok) {
          throw new Error(payload?.error || "We could not send your enquiry right now.");
        }
        setSent(true);
        form.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "We could not send your enquiry right now.");
      } finally {
        setSending(false);
      }
      return;
    }

    const body = [
      `Full Name: ${name}`,
      `Company Name: ${company}`,
      `Country: ${country}`,
      `Email Address: ${email}`,
      `Phone Number: ${phone}`,
      `Enquiry Type: ${enquiryType}`,
      "",
      "Message / Enquiry Details:",
      message,
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `WAED enquiry — ${enquiryType}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="section section--alt scene scene--cover" id="contact">
      <div className="shell contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">{contact.eyebrow}</p>
          <ScrollType text={contact.title} mode="rise" />
          <MarkRule className="mark-rule--left" />
          <p className="lead reveal reveal--up">{contact.lead}</p>
          <p className="lead muted reveal reveal--up">{contact.support}</p>

          <div className="contact-details">
            <a className="contact-chip" href={`mailto:${site.email}`}>
              <strong>Email</strong>
              <span>{site.email}</span>
            </a>
            <a className="contact-chip" href={`tel:${site.phoneHref}`}>
              <strong>Phone</strong>
              <span>{site.phoneDisplay}</span>
            </a>
            <div className="contact-chip">
              <strong>Factory</strong>
              <span>{site.address.street}</span>
            </div>
          </div>
        </div>

        <form
          className="form reveal reveal--up"
          method="post"
          action={enquiryEndpoint || undefined}
          onSubmit={onSubmit}
          noValidate={false}
        >
          {/* Honeypot for the Bluehost PHP handler */}
          <input
            className="form-honeypot"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="form-row">
            <label>
              Full Name
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              Company Name
              <input name="company" autoComplete="organization" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Country
              <input name="country" autoComplete="country-name" />
            </label>
            <label>
              Email Address
              <input name="email" type="email" required autoComplete="email" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Phone Number
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label>
              Enquiry Type
              <select name="enquiryType" defaultValue={contact.enquiryTypes[0]} required>
                {contact.enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Message / Enquiry Details
            <textarea
              name="message"
              required
              placeholder="Tell us what you’re looking for — product, fragrance, pack size, or a custom home brand…"
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? "Sending…" : contact.submitLabel}
          </button>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          {sent && (
            <p className="form-success" role="status">
              {enquiryEndpoint
                ? "Thank you. Your enquiry has been sent to WAED Industrial."
                : contact.successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
