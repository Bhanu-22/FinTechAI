
"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/db";

export default function VerifyEventsPage() {
    const [events, setEvents] = useState<any[]>([]);

    const loadEvents = async () => {
        const all = await db.gig_events.toArray();
        setEvents(all);
    };

    return (
        <div className="p-10 font-mono">
            <h1 className="text-2xl font-bold mb-4">Event Verification</h1>
            <button onClick={loadEvents} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">
                Refresh Events
            </button>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Timestamp</th>
                        <th className="border p-2">Metadata</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(e => (
                        <tr key={e.id}>
                            <td className="border p-2">{e.id}</td>
                            <td className="border p-2 text-blue-600 font-bold">{e.event_type}</td>
                            <td className="border p-2">{e.timestamp}</td>
                            <td className="border p-2 text-xs">{JSON.stringify(e.metadata)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
