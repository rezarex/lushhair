'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, CheckCircle2, Scissors, User, Phone, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Use the same services list from your Services Management
const services = [
  { id: 1, name: "Box Braids (Medium)", price: 120, duration: "4-6 hrs" },
  { id: 2, name: "Knotless Braids", price: 150, duration: "5-7 hrs" },
  { id: 3, name: "Wig Install", price: 85, duration: "2 hrs" },
  { id: 4, name: "Crochet Braids", price: 90, duration: "3 hrs" },
];

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      totalPrice: selectedService.price
    };

    console.log("🚀 Submitting Booking Request:", payload);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-gray-800">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-black dark:text-white mb-2">Request Received!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Thank you, {formData.name.split(' ')[0]}. We've received your booking request for {selectedService.name}. We will contact you shortly to confirm.
          </p>
          <Link href="/" className="block w-full py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition-all">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={step > 1 ? prevStep : undefined} className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${step === 1 ? 'invisible' : 'visible'}`}>
            <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div className="text-center">
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-pink-600">Step {step} of 3</span>
            <h1 className="text-lg font-bold dark:text-white uppercase tracking-tighter">
              {step === 1 ? 'Select Service' : step === 2 ? 'Choose Time' : 'Confirm Details'}
            </h1>
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="p-6 sm:p-8">
              <div className="grid gap-3">
                {services.map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => { setSelectedService(s); nextStep(); }}
                    className="flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:border-pink-500 transition-all text-left group"
                  >
                    <div>
                      <p className="font-bold dark:text-white group-hover:text-pink-600 transition-colors">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black dark:text-white">${s.price}</p>
                      <span className="text-[10px] text-pink-500 font-bold uppercase">Select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none outline-none dark:text-white focus:ring-2 focus:ring-pink-500 transition-all"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Available Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        selectedTime === time 
                        ? 'border-pink-600 bg-pink-50 text-pink-600 dark:bg-pink-900/20' 
                        : 'border-gray-100 dark:border-gray-800 dark:text-gray-400 hover:border-pink-200'
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
                className="w-full py-4 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-2xl font-black tracking-widest disabled:opacity-20 transition-all"
              >
                CONTINUE
              </button>
            </div>
          )}

          {/* STEP 3: CONTACT FORM */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Selected Service</p>
                  <p className="text-sm font-bold dark:text-white">{selectedService.name} - ${selectedService.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Appointment</p>
                  <p className="text-sm font-bold dark:text-white">{selectedDate} @ {selectedTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required name="name" type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none dark:text-white focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required name="email" type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none dark:text-white focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required name="phone" type="tel" placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl outline-none dark:text-white focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black tracking-[0.2em] hover:bg-pink-700 shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "SENDING REQUEST..." : "CONFIRM BOOKING"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}