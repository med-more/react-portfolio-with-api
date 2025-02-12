import emailjs from "@emailjs/browser";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

import countries from "../constants/countries.json";


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        countryCode: countries[0].code,
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let errors = {};
        if (!formData.name) errors.name = "Name is required";
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }
        if (!formData.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^[0-9]{7,15}$/.test(formData.phone)) {
            errors.phone = "Phone number is invalid";
        }
        if (!formData.message) errors.message = "Message is required";
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setIsSending(true);

            emailjs.send("service_9uwjqvl", "template_bbjkbmd", formData, "vRMl-7K7hM7ItUObZ")
                .then((response) => {
                    toast.success("Message sent successfully");
                    setFormData({ name: "", email: "", countryCode: countries[0].code, phone: "", message: "" });
                })
                .catch((error) => {
                    console.error("FAILED...", error);
                    toast.error("Failed to send message. Please try again.");
                })
                .finally(() => {
                    setIsSending(false);
                });
        }
    };

    return (
        <div className="p-4 lg:w-3/4 mx-auto max-w-5xl" id="contact">
            <Toaster />
            <h2 className="my-8 text-center text-4xl font-semibold tracking-tighter text-white">Let's Connect</h2>
            <div className="relative w-full rounded-2xl bg-black/30 p-8 backdrop-blur-xl shadow-lg border border-stone-50/30 bg-gradient-to-br from-white/10 to-white/5">
                <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col lg:flex-row space-x-0 lg:space-x-4">
                        <div className="lg:w-1/2">
                            <input type="text" id="name" name="name" value={formData.name} placeholder="Name" onChange={handleChange} className="mb-4 w-full appearance-none rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-white focus:outline-none" />
                            {errors.name && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="req text-sm text-rose-500">{errors.name}</motion.p>}
                        </div>
                        <div className="lg:w-1/2">
                            <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="mb-4 w-full appearance-none rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-white focus:outline-none" />
                            {errors.email && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="req text-sm text-rose-500">{errors.email}</motion.p>}
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col lg:flex-row space-x-0 lg:space-x-4">
                        <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="mb-4 w-1/4 rounded-lg border border-white/20 bg-black  px-3 py-2 text-sm text-white focus:border-white focus:outline-none">
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>{country.name} ({country.code})</option>
                            ))}
                        </select>
                        <input type="tel" id="phone" name="phone" value={formData.phone} placeholder="Phone Number" onChange={handleChange} className="mb-4 w-3/4 appearance-none rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-white focus:outline-none" />
                        {errors.phone && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="req text-sm text-rose-500">{errors.phone}</motion.p>}
                    </div>
                    <div className="mb-4">
                        <textarea id="message" name="message" value={formData.message} placeholder="Message" onChange={handleChange} className="mb-4 w-full appearance-none rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white focus:border-white focus:outline-none" rows="6" />
                        {errors.message && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="req text-sm text-rose-500">{errors.message}</motion.p>}
                    </div>
                    <button type="submit" className={`w-full rounded border border-white/20 bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 ${isSending ? "cursor-not-allowed opacity-50" : ""}`} disabled={isSending}>
                        <div className="flex items-center justify-center gap-2">
                            {isSending ? "Sending..." : "Send"}
                            <FiSend />
                        </div>
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default ContactForm;
