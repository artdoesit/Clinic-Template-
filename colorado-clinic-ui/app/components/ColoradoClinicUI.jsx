


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ColoradoClinicUI = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Modal & Selection States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDoctorsPanelOpen, setIsDoctorsPanelOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false); 
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("Any Available Doctor");
  const [filterSpecialty, setFilterSpecialty] = useState(null); 
  const [rating, setRating] = useState(5); 

  // Reviews Data
  const [reviewsList, setReviewsList] = useState([
    { id: 1, rating: 5, title: "Incredible Staff", text: `"The doctors here completely changed my life."`, author: "Sarah T." },
    { id: 2, rating: 4, title: "Very Professional", text: `"Quick booking process."`, author: "Mike R." }
  ]);

  const clinicDoctors = [
    { id: 1, name: "Dr. Nguyen", specialty: "Pain Management", rating: "4.9", image: "/doctor.png" },
    { id: 2, name: "Dr. Sarah Jenkins", specialty: "Physical Therapy", rating: "4.8", image: "/doctor.png" },
    { id: 3, name: "Dr. Marcus Chen", specialty: "Orthopedics", rating: "5.0", image: "/doctor.png" },
    { id: 4, name: "Dr. Emily Rostova", specialty: "Neurology", rating: "4.7", image: "/doctor.png" },
  ];

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];
  const displayedDoctors = filterSpecialty ? clinicDoctors.filter(doc => doc.specialty === filterSpecialty) : clinicDoctors;

  // Cleanup effect to ensure no scrollbars appear globally
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    // OPTIMIZED: overflow-hidden on main container removes scrollbars
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-2 sm:p-10 overflow-hidden font-sans bg-cover bg-center bg-slate-200" style={{ backgroundImage: "url('/mountain-bg.jpg')" }}>
      
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] z-0 pointer-events-none"></div>
      
      <div className="relative w-full max-w-7xl h-[94vh] sm:h-[85vh] z-10" style={{ perspective: '2000px' }}>
        
        {/* Main Dashboard Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="absolute inset-0 bg-white/20 backdrop-blur-lg border border-white/40 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-row overflow-hidden transform-gpu"
        >
          
          {/* SIDEBAR (Desktop) */}
          <motion.nav animate={{ width: isSidebarOpen ? 200 : 0 }} className="hidden md:flex border-r border-white/30 flex-col p-6 bg-white/5 z-20 shrink-0 transition-all overflow-hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-700 text-3xl mb-12 focus:outline-none hover:text-blue-600 transition-colors">≡</button>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 text-xs font-bold text-slate-500 tracking-widest whitespace-nowrap">
                  {['OVERVIEW', 'SERVICES', 'REVIEWS', 'CONTACT'].map((tab) => (
                    <li key={tab} onClick={() => setActiveTab(tab)} className={`cursor-pointer transition-all ${activeTab === tab ? 'text-blue-900 scale-105' : 'hover:text-blue-900'}`}>{tab}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.nav>

          <main className="flex-1 relative p-5 sm:p-10 flex flex-col overflow-hidden">
            
            {/* Header */}
            <header className="flex justify-between items-center z-20 gap-4 mb-4 select-none">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-5xl font-black text-slate-800 tracking-tighter uppercase leading-none">Colorado Clinic</h1>
                <div className="inline-flex items-center mt-2 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-slate-600 border border-white/50">
                  ⭐ 2.9 (Artdoesit Verified)
                </div>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => setIsBookingOpen(true)} className="bg-white/90 hover:bg-white text-slate-800 px-5 sm:px-8 py-2.5 rounded-full font-black shadow-lg text-[10px] sm:text-xs active:scale-95 transition-all uppercase tracking-widest">Book Now</button>
                 <a href="tel:+17193750435" className="hidden sm:flex bg-white/30 hover:bg-white/50 text-slate-800 px-6 py-2.5 rounded-full font-bold shadow-md text-xs border border-white/40 items-center gap-2 transition-all">📞 CALL</a>
              </div>
            </header>

            {/* SMOOTH MAP BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none transform-gpu will-change-transform">
                <Image src="/map-2d.png" alt="Map" fill className="object-cover object-center sm:object-[center_35%] opacity-90 transition-opacity duration-700" priority />
            </div>

            {/* DYNAMIC CONTENT AREA */}
            <div className="flex-1 relative z-20 overflow-hidden mt-auto">
              <AnimatePresence mode="wait">
                
                {activeTab === 'OVERVIEW' && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative h-full w-full">
                    
                    {/* Location Widget */}
                    <div className="relative md:absolute md:bottom-0 md:left-0 w-full sm:w-72 bg-white/20 backdrop-blur-md border border-white/50 rounded-[2rem] p-5 shadow-xl mb-4 md:mb-0 transition-all hover:bg-white/30">
                       <h3 className="text-[10px] font-black text-slate-600 tracking-widest mb-3 uppercase opacity-60">Location & Info</h3>
                       <div className="h-28 sm:h-32 w-full rounded-2xl mb-4 relative overflow-hidden bg-white/10 flex items-center justify-center cursor-pointer group" onClick={() => setActiveTab('CONTACT')}>
                          <Image src="/hospital.png" alt="Clinic" fill className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-green-400 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">OPEN</div>
                       </div>
                       {/* UPDATED: Sahi Google Maps Link yahan add kiya hai */}
                       <button onClick={() => window.open("https://www.google.com/maps/place/Colorado+Clinic/@38.8656244,-104.8206018,15z/data=!4m10!1m2!2m1!1sclinics+in+USA!3m6!1s0x87134560226f3649:0xfc226abe1209dcf9!8m2!3d38.865922!4d-104.8205892!15sCg5jbGluaWNzIGluIFVTQVoQIg5jbGluaWNzIGluIHVzYZIBE3BhaW5fY29udHJvbF9jbGluaWOaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTXRaemhMVGpkQlJSQULgAQD6AQUIwgIQHg!16s%2Fg%2F11csqg8yn1?entry=ttu&g_ep=EgoyMDI2MDMwNS4wIKXMDSoASAFQAw%3D%3D", "_blank")} className="w-full bg-white/60 hover:bg-white text-slate-800 text-[10px] font-black py-3 rounded-full shadow-md transition-all active:scale-95 uppercase tracking-tighter">📍 View on Map</button>
                    </div>

                    {/* Doctors Mini Widget */}
                    <div onClick={() => setIsDoctorsPanelOpen(true)} className="hidden lg:flex items-center gap-4 bg-white/20 backdrop-blur-md border border-white/50 rounded-full p-2 pr-8 shadow-xl cursor-pointer hover:scale-105 transition-all absolute bottom-0 left-1/2 -translate-x-1/2">
                       <div className="w-16 h-16 rounded-full overflow-hidden relative bg-blue-50/40 border-2 border-white"><Image src="/doctor.png" alt="Doc" fill className="object-contain p-1" /></div>
                       <div className="whitespace-nowrap"><h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">Experts</h3><h2 className="text-lg font-black text-slate-800 tracking-tight">Meet Our Doctors</h2></div>
                    </div>

                    {/* Review Mini Widget */}
                    <div className="relative md:absolute md:bottom-0 md:right-0 w-full sm:w-72 flex flex-col items-end gap-3">
                       <div onClick={() => setActiveTab('REVIEWS')} className="bg-white/60 backdrop-blur-md border border-white/50 rounded-[1.5rem] p-4 shadow-xl w-full cursor-pointer hover:scale-[1.02] -rotate-1 hover:rotate-0 transition-all">
                          <div className="text-yellow-500 text-[10px] mb-1">⭐⭐⭐⭐⭐</div>
                          <p className="text-xs font-black text-slate-800 truncate mb-0.5">{reviewsList[0].title}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 italic font-medium opacity-80">{reviewsList[0].text}</p>
                       </div>
                       <button onClick={() => setIsReviewOpen(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black py-3 rounded-full shadow-lg active:scale-95 transition-all uppercase tracking-widest">Write a Review</button>
                    </div>

                  </motion.div>
                )}

                {/* --- Other Tabs (Services, Reviews, Contact) are now even lighter for performance --- */}
                {activeTab === 'SERVICES' && (
                  <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center h-full">
                     <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md border border-white/50 rounded-[2rem] p-8 shadow-2xl">
                        <h3 className="text-xs font-black text-slate-600 mb-6 uppercase tracking-widest opacity-60">Medical Specialties</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['Pain Management', 'Physical Therapy', 'Neurology', 'Orthopedics'].map(s => (
                            <div key={s} onClick={() => {setFilterSpecialty(s); setIsDoctorsPanelOpen(true);}} className="bg-white/40 border border-white/40 rounded-2xl p-4 flex justify-between items-center hover:bg-white/80 transition-all cursor-pointer shadow-sm group">
                              <span className="font-black text-slate-800 text-sm">{s}</span>
                              <span className="text-blue-500 group-hover:translate-x-1 transition-transform">➔</span>
                            </div>
                          ))}
                        </div>
                     </div>
                  </motion.div>
                )}

                {activeTab === 'REVIEWS' && (
                  <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center h-full">
                     <div className="w-full max-w-xl bg-white/30 backdrop-blur-md border border-white/50 rounded-[2rem] p-6 shadow-2xl flex flex-col gap-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                        <div className="flex justify-between items-center sticky top-0 bg-white/40 p-3 rounded-2xl backdrop-blur-lg border border-white/40 z-10 shadow-sm">
                          <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Patient Feedback</h3>
                          <button onClick={() => setIsReviewOpen(true)} className="bg-blue-600 text-white text-[9px] font-black px-4 py-2 rounded-full shadow-md uppercase">Add New</button>
                        </div>
                        {reviewsList.map(r => (
                          <div key={r.id} className="bg-white/60 rounded-2xl p-4 border border-white/30 shadow-sm">
                            <div className="text-yellow-500 text-[10px] mb-1">{'⭐'.repeat(r.rating)}</div>
                            <p className="text-sm font-black text-slate-800">{r.title}</p>
                            <p className="text-xs text-slate-500 italic mb-1 font-medium">{r.text}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">- {r.author}</p>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}

                {activeTab === 'CONTACT' && (
                  <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center items-center h-full">
                     <div className="w-full max-w-sm bg-white/30 backdrop-blur-md border border-white/50 rounded-[2rem] p-8 shadow-2xl">
                        <h3 className="text-xs font-black text-slate-600 mb-6 uppercase tracking-widest opacity-60">Get In Touch</h3>
                        <div className="space-y-5 mb-8">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">📞</div>
                              <div><p className="text-[9px] font-black text-slate-400 uppercase">Phone</p><a href="tel:+17193750435" className="text-sm font-black text-slate-800 hover:text-blue-600 transition-colors">+1 719-375-0435</a></div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shadow-inner">📍</div>
                              <div><p className="text-[9px] font-black text-slate-400 uppercase">Address</p><p className="text-sm font-black text-slate-800 leading-tight">Colorado Springs, CO</p></div>
                           </div>
                        </div>
                        <button onClick={() => setIsContactOpen(true)} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 uppercase text-[10px] tracking-widest">Send Message</button>
                     </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* MOBILE NAVIGATION BAR (Clean & Simple) */}
            <div className="md:hidden absolute bottom-2 left-2 right-2 h-14 bg-white/40 backdrop-blur-xl border border-white/40 rounded-full z-30 flex justify-around items-center px-6 shadow-lg">
               {['OVERVIEW', 'SERVICES', 'REVIEWS', 'CONTACT'].map((tab) => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`text-[10px] font-black transition-all ${activeTab === tab ? 'text-blue-900 scale-110' : 'text-slate-400 opacity-60'}`}>{tab[0]}</button>
               ))}
            </div>

            {/* MODALS SECTION (Optimized for zero-lag) */}
            <AnimatePresence>
               {(isBookingOpen || isDoctorsPanelOpen || isReviewOpen || isContactOpen) && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 pointer-events-auto">
                    <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] shadow-2xl w-full max-w-xl relative overflow-y-auto max-h-[85vh] no-scrollbar transform-gpu">
                       <button onClick={() => { setIsBookingOpen(false); setIsDoctorsPanelOpen(false); setIsReviewOpen(false); setIsContactOpen(false); setFilterSpecialty(null); }} className="absolute top-5 right-6 text-slate-400 hover:text-slate-800 text-2xl font-black transition-colors">✕</button>
                       
                       {/* Content logic exactly as before, but wrapped in ultra-clean UI... */}
                       {isDoctorsPanelOpen && (
                         <div>
                            <h2 className="text-2xl font-black text-slate-800 mb-6 uppercase tracking-tighter italic">Medical Team</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               {displayedDoctors.map(doc => (
                                 <div key={doc.id} className="bg-white/40 border border-white/50 rounded-2xl p-4 flex items-center gap-4 hover:bg-white shadow-sm transition-all">
                                    <div className="w-12 h-12 rounded-full overflow-hidden relative bg-blue-50 border border-white shrink-0 shadow-inner"><Image src={doc.image} alt={doc.name} fill className="object-contain p-1" /></div>
                                    <div className="flex-1"><h3 className="font-black text-slate-800 text-xs">{doc.name}</h3><p className="text-[9px] text-slate-400 font-black uppercase">{doc.specialty}</p></div>
                                    <button onClick={() => {setSelectedDoctor(doc.name); setIsDoctorsPanelOpen(false); setIsBookingOpen(true);}} className="bg-slate-800 text-white text-[9px] font-black py-2 px-4 rounded-full active:scale-95 transition-all uppercase tracking-tighter">Book</button>
                                 </div>
                               ))}
                            </div>
                         </div>
                      )}

                      {isBookingOpen && (
                        <form onSubmit={(e) => { e.preventDefault(); setIsBookingOpen(false); alert("Success!"); }} className="space-y-4">
                           <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Appointment</h2>
                           <p className="text-[10px] text-blue-600 font-black uppercase mb-4 tracking-[0.2em] bg-blue-50 inline-block px-3 py-1 rounded-full">{selectedDoctor}</p>
                           <input type="text" required placeholder="Full Name" className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20" />
                           <input type="date" required className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold text-slate-800 outline-none" />
                           <div className="flex flex-wrap gap-2 py-2">
                              {timeSlots.map(t => (
                                <button key={t} type="button" onClick={() => setSelectedSlot(t)} className={`px-3 py-2 rounded-lg text-[10px] font-black border transition-all ${selectedSlot === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-white/60'}`}>{t}</button>
                              ))}
                           </div>
                           <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl mt-4 uppercase text-[10px] tracking-widest active:scale-95 transition-transform">Confirm Visit</button>
                        </form>
                      )}

                      {isReviewOpen && (
                        <form onSubmit={(e) => { e.preventDefault(); setIsReviewOpen(false); alert("Review Added!"); }} className="space-y-5 text-center">
                           <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Write Review</h2>
                           <div className="flex justify-center gap-3 mb-6 text-4xl">
                              {[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setRating(s)} className={`transition-transform hover:scale-110 ${rating >= s ? "text-yellow-500" : "text-slate-200"}`}>⭐</button>)}
                           </div>
                           <input required placeholder="Your Name" className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold outline-none" />
                           <textarea required rows="4" placeholder="Share your experience..." className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold outline-none resize-none" />
                           <button className="w-full bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest">Submit Feedback</button>
                        </form>
                      )}

                      {isContactOpen && (
                        <form onSubmit={(e) => { e.preventDefault(); setIsContactOpen(false); alert("Message Sent!"); }} className="space-y-5">
                           <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Contact Us</h2>
                           <input type="email" required placeholder="Email Address" className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold outline-none" />
                           <textarea required rows="5" placeholder="How can our team help?" className="w-full bg-white/60 border border-white/60 rounded-xl px-4 py-4 text-sm font-bold outline-none resize-none" />
                           <button className="w-full bg-slate-800 text-white font-black py-5 rounded-2xl shadow-xl uppercase text-[10px] tracking-widest">Send Message</button>
                        </form>
                      )}
                   </motion.div>
                 </motion.div>
               )}
            </AnimatePresence>

          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default ColoradoClinicUI;