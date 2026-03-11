import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useTranslation } from "../hooks/useTranslation";
import contact_img from "../resources/contact.jpg";

// ---------------------------------------------------------------------------
// Formspree setup (free, no backend, works with your GoDaddy email):
//   1. Go to https://formspree.io and sign up
//   2. Click "New Form", enter your GoDaddy email as the recipient
//   3. Copy your form ID from the endpoint shown (e.g. "xyzabc12")
//   4. Paste just the ID below ↓
// ---------------------------------------------------------------------------
const FORMSPREE_FORM_ID = "xbdaeyle"; // e.g. "xyzabc12"

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }

    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-96 flex flex-col pt-20">
        <div
          className="absolute inset-0 z-4"
          style={{
            backgroundImage: `url(${contact_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div
          className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-6 max-w-7xl mx-auto w-full py-12"
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
            {t("contactPage.hero.title")}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            {t("contactPage.hero.description")}
          </p>
        </div>
      </section>

      {/* Contact Content Section */}
      <section ref={contentRef} className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
            {/* Email Card */}
            <div
              className={`flex flex-col items-center text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                <Mail className="w-7 h-7 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("contactPage.contactInfo.email.title")}
              </h3>
              <p className="text-gray-600">
                <a
                  href={`mailto:${t("contactPage.contactInfo.email.primary")}`}
                  className="hover:text-blue-800 transition-colors"
                >
                  {t("contactPage.contactInfo.email.primary")}
                </a>
              </p>
              <p className="text-gray-600">
                <a
                  href={`mailto:${t(
                    "contactPage.contactInfo.email.secondary"
                  )}`}
                  className="hover:text-blue-800 transition-colors"
                >
                  {t("contactPage.contactInfo.email.secondary")}
                </a>
              </p>
            </div>

            {/* Phone Card */}
            <div
              className={`flex flex-col items-center text-center transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                <Phone className="w-7 h-7 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("contactPage.contactInfo.phone.title")}
              </h3>
              <p className="text-gray-600">
                <a
                  href={`tel:${t(
                    "contactPage.contactInfo.phone.primary"
                  ).replace(/\s/g, "")}`}
                  className="hover:text-blue-800 transition-colors"
                >
                  {t("contactPage.contactInfo.phone.primary")}
                </a>
              </p>
              <p className="text-gray-600">
                <a
                  href={`tel:${t(
                    "contactPage.contactInfo.phonenew.primary"
                  ).replace(/\s/g, "")}`}
                  className="hover:text-blue-800 transition-colors"
                >
                  {t("contactPage.contactInfo.phonenew.primary")}
                </a>
              </p>
              <p className="text-gray-600">
                <a
                  href={`tel:${t(
                    "contactPage.contactInfo.phone.secondary"
                  ).replace(/\s/g, "")}`}
                  className="hover:text-blue-800 transition-colors"
                >
                  {t("contactPage.contactInfo.phone.secondary")}
                </a>
              </p>
            </div>

            {/* Location Card */}
            <div
              className={`flex flex-col items-center text-center transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                <MapPin className="w-7 h-7 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("contactPage.contactInfo.location.title")}
              </h3>
              <p className="text-gray-600">
                {t("contactPage.contactInfo.location.company")}
                <br />
                {t("contactPage.contactInfo.location.address")}
              </p>
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                {t("contactPage.form.title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactPage.form.fields.name.label")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contactPage.form.fields.name.placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactPage.form.fields.email.label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contactPage.form.fields.email.placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactPage.form.fields.phone.label")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("contactPage.form.fields.phone.placeholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contactPage.form.fields.message.label")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t(
                      "contactPage.form.fields.message.placeholder"
                    )}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">
                      Message sent! We'll get back to you soon.
                    </span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <XCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">
                      Something went wrong. Please try again or email us
                      directly.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-900 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitStatus === "loading" ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t("contactPage.form.submitButton")}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map — 91-A/3, Vrindavan Society, Thane West 400601 */}
            <div
              className={`flex flex-col transition-all duration-700 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                {t("contactPage.map.title")}
              </h2>
              <div className="flex-1 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <iframe
                  width="100%"
                  height="500"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=72.9681%2C19.2133%2C72.9881%2C19.2233&layer=mapnik&marker=19.2183%2C72.9781"
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
              <a
                href="https://www.openstreetmap.org/?mlat=19.2183&mlon=72.9781#map=16/19.2183/72.9781"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-xs text-blue-700 hover:underline self-end"
              >
                View larger map ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
