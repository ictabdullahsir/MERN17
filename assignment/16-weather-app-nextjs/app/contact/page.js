import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contact | Weather App" };

export default function ContactPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Contact</h1>
      <p className="mb-6 text-slate-600">
        কোনো প্রশ্ন বা মতামত থাকলে নিচের form-এ জানান।
      </p>
      <ContactForm />
    </div>
  );
}
