import React, { useState, useEffect } from 'react';

const StoreStatus = () => {
    const [status, setStatus] = useState({ isOpen: false, message: '' });

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date(); // Uses local system time
            const day = now.getDay(); // 0 = Sun, 1 = Mon, ...
            const hour = now.getHours();
            const minute = now.getMinutes();
            const currentTime = hour + minute / 60;

            // Hours configuration
            // 0 (Sun): Closed
            // 1-4 (Mon-Thu): 11:00 - 20:00 (8 PM)
            // 5-6 (Fri-Sat): 11:00 - 21:00 (9 PM)
            const hours = {
                0: null,
                1: { open: 11, close: 20 },
                2: { open: 11, close: 20 },
                3: { open: 11, close: 20 },
                4: { open: 11, close: 20 },
                5: { open: 11, close: 21 },
                6: { open: 11, close: 21 },
            };

            const todayHours = hours[day];

            // Check if open right now
            if (todayHours && currentTime >= todayHours.open && currentTime < todayHours.close) {
                setStatus({ isOpen: true, message: `Open until ${todayHours.close > 12 ? todayHours.close - 12 : todayHours.close} PM` });
                return;
            }

            // If closed, calculate next opening
            let nextDay = day;
            let daysAdded = 0;
            let foundNext = false;

            while (!foundNext && daysAdded < 7) {
                // If checking today (and we know we are closed currently), check if we open LATER today (e.g. it's 9 AM)
                if (daysAdded === 0 && todayHours && currentTime < todayHours.open) {
                    setStatus({ isOpen: false, message: `Opens today at 11:00 AM` });
                    return;
                }

                // Move to next day
                nextDay = (nextDay + 1) % 7;
                daysAdded++;

                const nextHours = hours[nextDay];
                if (nextHours) {
                    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][nextDay];
                    // Assume 11 AM always for simplified logic based on provided hours
                    setStatus({ isOpen: false, message: `Opens ${daysAdded === 1 ? 'Tomorrow' : dayName} at 11:00 AM` });
                    foundNext = true;
                }
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md ${status.isOpen
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
            <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="font-mono text-sm font-bold uppercase tracking-wider">
                {status.isOpen ? 'Now Open' : 'Closed'}
                <span className="mx-2 opacity-50">|</span>
                <span className="opacity-80 normal-case">{status.message}</span>
            </span>
        </div>
    );
};

export default StoreStatus;
