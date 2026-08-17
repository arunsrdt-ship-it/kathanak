import type { Metadata } from 'next';
import { MessageSquare, MapPin, Mail, Phone } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm';

export const metadata: Metadata = {
  title: 'Contact — Kathanak',
  description: 'Get in touch with us.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Editorial Header */}
      <div className="border-b-2 border-border bg-accent-blue pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
          <div className="flex flex-col items-start">
            <div className="section-label mb-8">INITIATE COMMUNICATION</div>
            <h1 className="font-display text-[clamp(4rem,8vw,6rem)] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              CONTACT <br /> KATHANAK
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Info Column */}
          <div className="flex flex-col gap-12">
             
             <div>
                <h2 className="font-display text-4xl font-black uppercase tracking-tighter mb-6 border-b-2 border-border pb-4">
                  REACH OUT
                </h2>
                <p className="font-prose text-xl text-text-primary leading-[1.8] mb-8">
                  Whether you want to collaborate, share your thoughts on a specific piece, or simply say hello, we are always open to communication. Fill out the secure form, and your message will be routed directly to our inbox.
                </p>

                <div className="flex flex-col gap-6">
                   <div className="brutalist-card bg-bg-alt p-6 flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full border-2 border-border bg-white flex items-center justify-center shrink-0">
                       <Mail size={16} />
                     </div>
                     <div>
                       <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">DIRECT INBOX</h3>
                       <p className="font-display text-xl font-bold">kathanak19@outlook.com</p>
                     </div>
                   </div>

                   <div className="brutalist-card bg-bg-alt p-6 flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full border-2 border-border bg-white flex items-center justify-center shrink-0">
                       <MapPin size={16} />
                     </div>
                     <div>
                       <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">HQ LOCATION</h3>
                       <p className="font-display text-xl font-bold">Lucknow, Uttar Pradesh, India</p>
                     </div>
                   </div>
                </div>
             </div>

          </div>

          {/* Form Column */}
          <div className="brutalist-card bg-white p-8 lg:p-12 relative">
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-beige border-2 border-border rounded-full flex items-center justify-center z-10">
               <MessageSquare size={16} />
             </div>
             <FeedbackForm />
          </div>

        </div>
      </div>
    </div>
  );
}
