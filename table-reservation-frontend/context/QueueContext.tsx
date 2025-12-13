'use client';

import { createContext, useContext, useEffect, useState } from "react";

type QueueContextType = {
    queueId: string;
    saveID: (id: string) => void;
    people: number;
    savePeople: (people: number) => void;
};

const QueueContext = createContext<QueueContextType | null>(null);

export function QueueProvider({ children }: { children: React.ReactNode }) {
    const [queueId, setQueueId] = useState<string>('');
    const [people, setPeople] = useState<number>(1);    
    useEffect(() => {
        const storedId = localStorage.getItem('queueId');
        if (storedId) {
            setQueueId(storedId);
        }
    }, []);

    const saveID = (id: string) => {
        localStorage.setItem('queueId', id);
        setQueueId(id);
    };

    const savePeople = (people: number) => {
        localStorage.setItem('people', people.toString());
        setPeople(people);
    };

    return (
        <QueueContext.Provider value={{ queueId, saveID, people, savePeople }}>
            {children}
        </QueueContext.Provider>
    );
}

export function useQueue() {
    const context = useContext(QueueContext);
    if (!context) {
        throw new Error('useQueue must be used within QueueProvider');
    }
    return context;
}
