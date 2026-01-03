
import Dexie, { Table } from 'dexie';

export interface GigEvent {
    id?: number;
    event_type: 'shift_saved' | 'expense_added' | 'savings_goal_set' | 'savings_progress_added' | 'summary_viewed';
    timestamp: string;
    metadata: any;
}

export class GigDatabase extends Dexie {
    gig_events!: Table<GigEvent>;

    constructor() {
        super('finance_db');
        this.version(1).stores({
            gig_events: '++id, event_type, timestamp'
        });
    }
}

export const db = new GigDatabase();
