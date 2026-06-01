// AppStoreProvider - Dependency Inversion via React Context
// Initializes anonymous ID on first launch

import { useEffect } from 'react';
import { useAppStore } from './index';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    children: React.ReactNode;
}

export function AppStoreProvider({ children }: Props) {
    const anonymousId = useAppStore((s) => s.anonymousId);
    const setAnonymousId = useAppStore((s) => s.setAnonymousId);

    useEffect(() => {
        // Auto-generate anonymous ID if not present
        if (!anonymousId) {
            setAnonymousId(uuidv4());
        }
    }, [anonymousId, setAnonymousId]);

    return <>{children}</>;
}