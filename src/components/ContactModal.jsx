import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactModal = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  // --- CONFIGURATION ---
  // 1. Go to https://www.emailjs.com/
  // 2. Create an account (Free)
  // 3. Get these 3 IDs from your dashboard and replace them below:
  const SERVICE_ID = "service_j1g6ymj"; 
  const TEMPLATE_ID = "template_a45edmn";
  const PUBLIC_KEY = "FP20Ba-CYxjMu9HO7"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          setLoading(false);
          setStatus('success');
          e.target.reset();
          // Auto close after 3 seconds of success 
          setTimeout(() => {
            setStatus(null);
            onClose();
          }, 3000);
      }, (error) => {
          setLoading(false);
          setStatus('error');
          console.error(error.text);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl pointer-events-auto overflow-hidden relative"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <div>
                   <h3 className="text-xl font-bold text-white">Let's Connect</h3>
                   <p className="text-sm text-gray-400">Project idea or just saying hi?</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <div className="p-6">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                      <input 
                        type="text" 
                        name="user_name" 
                        required
                        placeholder="hari venkatesh"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none text-white transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                      <input 
                        type="email" 
                        name="user_email" 
                        required
                        placeholder="hari@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none text-white transition-all placeholder:text-gray-600"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                      <textarea 
                        name="message" 
                        required
                        rows={4}
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none text-white transition-all placeholder:text-gray-600 resize-none"
                      />
                    </div>

                    {/* Error Message */}
                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <AlertCircle size={16} />
                        <span>Failed to send. Please try again later.</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;