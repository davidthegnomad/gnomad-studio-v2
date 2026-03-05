import { motion } from 'motion/react';
import { Phone, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <>
            <section id="contact" className="hidden md:block relative z-10 py-20 px-4 bg-gradient-to-b from-transparent to-black font-orbitron">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl text-center mb-16 font-bungee bg-gradient-to-b from-[#39FF14] to-white bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(57,255,20,0.8)]"
                    >
                        FIND THE MOTHERSHIP
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Interactive Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden neon-card h-[400px] w-full"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3243.518602931215!2d-95.3716616!3d35.7483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ca61d9be85311f%3A0x6bba46c6abdcbb36!2s301%20S%20Main%20St%2C%20Muskogee%2C%20OK%2074401!5e0!3m2!1sen!2sus!4v1714574921932!5m2!1sen!2sus"
                                width="100%"
                                className="w-full h-full border-0 [filter:invert(90%)_hue-rotate(180deg)_grayscale(80%)]"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Green St Dispensary map location"
                            ></iframe>
                        </motion.div>

                        {/* NAP Data & Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
                            {/* Location */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-center p-8 rounded-xl neon-card flex flex-col justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="mx-auto mb-4 text-4xl drop-shadow-neon"
                                >
                                    🛸
                                </motion.div>
                                <h3 className="text-xl mb-3 text-neon-green font-bold tracking-wider">LOCATION</h3>
                                <address className="text-gray-200 text-lg not-italic">
                                    <span className="block font-bold">Green St. Dispensary</span>
                                    301 S Main St<br />
                                    Muskogee, OK 74401
                                </address>
                            </motion.div>

                            {/* Hours */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-center p-8 rounded-xl neon-card flex flex-col justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    className="mx-auto mb-4 text-4xl drop-shadow-neon"
                                >
                                    🌌
                                </motion.div>
                                <h3 className="text-xl mb-3 text-neon-green font-bold tracking-wider">HOURS</h3>
                                <p className="text-gray-200 text-lg">
                                    Mon–Sat: <span className="text-white">9AM – 10PM</span><br />
                                    Sun: <span className="text-white">10AM – 10PM</span>
                                </p>
                            </motion.div>

                            {/* Contact Full Width */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="text-center p-8 rounded-xl neon-card md:col-span-2 flex flex-col justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: [-15, 15, -15] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="mx-auto mb-4 text-4xl drop-shadow-neon"
                                >
                                    📡
                                </motion.div>
                                <h3 className="text-xl mb-3 text-neon-green font-bold tracking-wider">CONTACT</h3>
                                <a
                                    href="tel:918-577-6160"
                                    className="text-gray-200 hover:text-white transition-colors text-2xl font-bold text-shadow-neon block"
                                >
                                    (918) 577-6160
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-4 border-t-2 border-neon-green/50 font-orbitron bg-black">
                <div className="max-w-6xl mx-auto">
                    {/* Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 p-6 rounded-lg border border-neon-green/30 bg-neon-green/10"
                    >
                        <p className="text-sm md:text-base text-neon-green/90 tracking-wider">
                            ⚠️ <strong className="text-white drop-shadow-neon">MEDICAL PATIENTS ONLY</strong> ⚠️
                            <br />
                            You must be 18+ with a valid Oklahoma Medical Marijuana License to enter.
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-8 mb-10">
                        {[
                            { Icon: Facebook, label: 'Facebook', href: '#' },
                            { Icon: Instagram, label: 'Instagram', href: '#' },
                            { Icon: Twitter, label: 'Twitter', href: '#' }
                        ].map(({ Icon, label, href }) => (
                            <motion.a
                                key={label}
                                href={href}
                                whileHover={{ scale: 1.2, y: -5, rotate: 5 }}
                                className="transition-all text-gray-400 hover:text-neon-green hover:drop-shadow-neon-lg relative group"
                            >
                                <Icon size={36} />
                                <span className="sr-only">{label}</span>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity text-neon-green">
                                    {label}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-sm border-t border-gray-800 pt-8 mt-12 w-full">
                        <p className="text-center md:text-left">
                            © {new Date().getFullYear()} Green ST. Dispensary. All Rights Reserved.<br />
                            <span className="text-xs">Muskogee, OK</span>
                        </p>

                        <a
                            href="https://gnomadstudio.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-neon-green transition-colors text-xs flex items-center gap-2 font-bold tracking-widest text-shadow-neon"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                <path d="m12 14 4-4" />
                                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                            </svg>
                            DESIGNED BY: GNOMAD STUDIO
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
