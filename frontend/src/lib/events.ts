
import { db, GigEvent } from './db';

type EventType = GigEvent['event_type'];

export const logEvent = async (type: EventType, metadata: any = {}) => {
    try {
        await db.gig_events.add({
            event_type: type,
            timestamp: new Date().toISOString(),
            metadata: metadata
        });
        console.log(`[GigEvent] ${type} logged.`, metadata);
    } catch (error) {
        console.error(`[GigEvent] Failed to log ${type}:`, error);
    }
};
