'use client';

import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config/config';

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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '', // Added as per your API schema
  });

  // 1. Fetch and Flatten Services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(GET_SERVICES_API);
        const data = await res.json();
        // Flatten the nested categories into a single list of service items
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

  // 2. Submit Booking to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      bookingDate: selectedDate,
      timeslot: selectedTime,
      phone: formData.phone,
      email: formData.email,
      service: selectedService.name
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
        <div className="max-w-md w-full bg-zinc-950 p-10 rounded-3xl shadow-2xl text-center border border-yellow-600/30">
          <div className="w-20 h-20 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Request Received!</h2>
          <p className="text-zinc-400 text-sm mb-8">
            Thank you, {formData.name.split(' ')[0]}. Your booking for <span className="text-yellow-500">{selectedService.name}</span> is being processed.
          </p>
          <Link href="/" className="block w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={step > 1 ? prevStep : undefined} className={`p-2 rounded-full hover:bg-zinc-800 transition-colors ${step === 1 ? 'invisible' : 'visible'}`}>
            <ArrowLeft size={20} className="text-yellow-500" />
          </button>
          <div className="text-center">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-green-500">Step {step} of 3</span>
            <h1 className="text-lg font-bold text-white uppercase tracking-tighter">
              {step === 1 ? 'Select Service' : step === 2 ? 'Choose Time' : 'Confirm Details'}
            </h1>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="bg-zinc-950 rounded-3xl shadow-2xl border border-yellow-600/20 overflow-hidden">
          
          {/* STEP 1: SERVICE (FLATTENED LIST) */}
          {step === 1 && (
            <div className="p-6 sm:p-8">
              {fetchingServices ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-yellow-500" /></div>
              ) : (
                <div className="grid gap-3">
                  {services.map((s) => (
                    <button 
                      key={s._id}
                      onClick={() => { setSelectedService(s); nextStep(); }}
                      className="flex items-center justify-between p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-green-500 transition-all text-left group"
                    >
                      <div>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{s.category}</p>
                        <p className="font-bold text-white group-hover:text-yellow-500 transition-colors">{s.name}</p>
                        <p className="text-xs text-zinc-500">{s.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-yellow-500">{s.price}</p>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase">Book Now</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 outline-none text-white focus:ring-2 focus:ring-green-500 transition-all"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Available Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        selectedTime === time 
                        ? 'border-green-600 bg-green-900/20 text-green-500' 
                        : 'border-zinc-800 text-zinc-500 hover:border-yellow-600'
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
                className="w-full py-4 bg-yellow-600 text-black rounded-2xl font-black tracking-widest disabled:opacity-20 transition-all hover:bg-yellow-500"
              >
                CONTINUE
              </button>
            </div>
          )}

          {/* STEP 3: CONTACT FORM */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="bg-zinc-900 p-4 rounded-2xl flex items-center justify-between border border-yellow-600/20">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Service</p>
                  <p className="text-sm font-bold text-yellow-500">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Appointment</p>
                  <p className="text-sm font-bold text-white">{selectedDate} @ {selectedTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input required placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input required type="tel" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input required placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl outline-none text-white focus:ring-2 focus:ring-green-500" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-green-600 text-white rounded-2xl font-black tracking-[0.2em] hover:bg-green-700 shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "CONFIRM BOOKING"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}