'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Phone, Mail, ArrowLeft, Loader2, MessageSquarePlus } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/config';
import Navbar from '@/components/Navbar';

const GET_SERVICES_API = `${API_BASE_URL}/services`; 
const ADD_BOOKING_API = `${API_BASE_URL}/booking/add`;

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [fetchingServices, setFetchingServices] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Added extraServices to state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '', 
    extraServices: '' 
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(GET_SERVICES_API);
        const data = await res.json();
        const flattened = data.flatMap(cat => 
          cat.items.map(item => ({
            ...item,
            category: cat.category
          }))
        );
        setServices(flattened);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setFetchingServices(false);
      }
    };
    fetchServices();
  }, []);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      bookingDate: selectedDate,
      timeslot: selectedTime,
      phone: formData.phone,
      email: formData.email,
      service: selectedService.name,
      extraServices: formData.extraServices // Included in payload
    };

    try {
      const response = await fetch(ADD_BOOKING_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="max-w-md w-full bg-zinc-950 p-10 rounded-3xl shadow-2xl text-center border border-[#D4AF37]/30">
          <div className="w-20 h-20 bg-[#2D5A27]/20 text-[#2D5A27] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#2D5A27]/40">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Request Received!</h2>
          <p className="text-zinc-400 text-sm mb-8 font-light">
            Thank you, {formData.name.split(' ')[0]}. Your booking for <span className="text-[#D4AF37] font-bold">{selectedService.name}</span> is being processed.
          </p>
          <Link href="/" className="block w-full py-4 bg-[#2D5A27] text-white rounded-xl font-bold hover:bg-black hover:ring-2 hover:ring-[#D4AF37] transition-all uppercase tracking-widest text-xs">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4 sm:px-6">
      <Navbar/>
      <div className="max-w-2xl mx-auto pt-10">
        
        <div className="flex items-center justify-between mb-12">
          <button onClick={step > 1 ? prevStep : undefined} className={`p-2 rounded-full border border-zinc-800 hover:border-[#D4AF37] transition-colors ${step === 1 ? 'invisible' : 'visible'}`}>
            <ArrowLeft size={20} className="text-[#D4AF37]" />
          </button>
          <div className="text-center">
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-[#2D5A27]">Step {step} of 3</span>
            <h1 className="text-2xl font-light text-white uppercase tracking-widest mt-1">
              {step === 1 ? 'Services' : step === 2 ? 'Schedule' : 'Confirm'}
            </h1>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="bg-zinc-950 rounded-3xl shadow-2xl border border-white/5 overflow-hidden">
          
          {/* STEP 1: SERVICES + CUSTOM OPTION */}
          {step === 1 && (
            <div className="p-6 sm:p-8">
              {fetchingServices ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#D4AF37]" size={40} /></div>
              ) : (
                <div className="grid gap-4">
                  
                  {/* NEW: CUSTOM SERVICE OPTION */}
                  <button 
                    onClick={() => { 
                      setSelectedService({ name: "Custom/Extra Service", category: "SPECIAL" }); 
                      nextStep(); 
                    }}
                    className="flex items-center justify-between p-6 rounded-2xl border-2 border-dashed border-[#D4AF37]/30 bg-[#D4AF37]/5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-left group"
                  >
                    <div>
                      <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Flexible Option</p>
                      <p className="font-bold text-white uppercase tracking-tight">Custom Service</p>
                      <p className="text-xs text-zinc-500 font-light italic">Choose this to describe what you need in Step 3</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest border-b border-[#D4AF37]/30 pb-0.5">Select</span>
                    </div>
                  </button>

                  <div className="relative py-4 flex items-center">
                    <div className="flex-grow border-t border-zinc-900"></div>
                    <span className="flex-shrink mx-4 text-[10px] text-zinc-700 font-bold uppercase tracking-widest">Or choose a standard service</span>
                    <div className="flex-grow border-t border-zinc-900"></div>
                  </div>

                  {/* STANDARD SERVICES */}
                  {services.map((s) => (
                    <button 
                      key={s._id}
                      onClick={() => { setSelectedService(s); nextStep(); }}
                      className="flex items-center justify-between p-6 rounded-2xl border border-zinc-900 bg-zinc-900/30 hover:border-[#D4AF37]/50 hover:bg-zinc-900 transition-all text-left group"
                    >
                      <div>
                        <p className="text-[10px] text-[#2D5A27] font-bold uppercase tracking-widest mb-1">{s.category}</p>
                        <p className="font-bold text-white group-hover:text-[#D4AF37] transition-colors uppercase tracking-tight">{s.name}</p>
                        <p className="text-xs text-zinc-500 font-light">{s.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest border-b border-[#D4AF37]/30 pb-0.5">Select</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-3">1. Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 outline-none text-white focus:border-[#D4AF37] transition-all color-scheme-dark"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] block mb-3">2. Available Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-xl border font-bold text-xs transition-all tracking-widest ${
                        selectedTime === time 
                        ? 'border-[#2D5A27] bg-[#2D5A27]/20 text-[#2D5A27]' 
                        : 'border-zinc-800 text-zinc-500 hover:border-[#D4AF37]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                disabled={!selectedDate || !selectedTime}
                onClick={nextStep} 
                className="w-full py-5 bg-black text-[#D4AF37] border-2 border-[#D4AF37] rounded-2xl font-black tracking-[0.3em] text-xs disabled:opacity-20 transition-all hover:bg-[#D4AF37] hover:text-black"
              >
                CONTINUE
              </button>
            </div>
          )}

          {/* STEP 3: CONTACT FORM + EXTRA SERVICES */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="bg-zinc-900/50 p-5 rounded-2xl flex items-center justify-between border border-[#D4AF37]/10">
                <div>
                  <p className="text-[9px] text-[#2D5A27] uppercase font-black tracking-widest">Service</p>
                  <p className="text-sm font-bold text-[#D4AF37] uppercase">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#2D5A27] uppercase font-black tracking-widest">Appointment</p>
                  <p className="text-sm font-bold text-white">{selectedDate} <span className="text-zinc-500 font-light">@</span> {selectedTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input required placeholder="FULL NAME" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:border-[#D4AF37] text-xs tracking-widest transition-all" />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input required type="tel" placeholder="PHONE NUMBER" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:border-[#D4AF37] text-xs tracking-widest transition-all" />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <input required placeholder="EMAIL ADDRESS" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:border-[#D4AF37] text-xs tracking-widest transition-all" />
                </div>
                
                {/* EXTRA SERVICES TEXT BOX */}
                <div className="relative group">
                  <MessageSquarePlus className="absolute left-4 top-6 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                  <textarea 
                    placeholder="ADD EXTRA SERVICES OR SPECIAL REQUESTS..." 
                    rows={3}
                    onChange={(e) => setFormData({...formData, extraServices: e.target.value})} 
                    className="w-full pl-12 pr-4 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:border-[#D4AF37] text-xs tracking-widest transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#2D5A27] text-white rounded-2xl font-black tracking-[0.3em] text-xs hover:bg-[#1a3a16] shadow-xl shadow-[#2D5A27]/10 transition-all flex items-center justify-center gap-3 uppercase"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Finalize Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}