"use client";

import ReactConfetti from "react-confetti";
import { createContext, useContext, useEffect, useState } from "react";

type ConfettiStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const ConfettiContext = createContext<ConfettiStore>({
    isOpen: false,
    onOpen: () => { },
    onClose: () => { },
});

export const useConfettiStore = () => useContext(ConfettiContext);

export const ConfettiProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    if (!isMounted) {
        return (
             <ConfettiContext.Provider value={{ isOpen, onOpen, onClose }}>
                {children}
            </ConfettiContext.Provider>
        );
    }

    return (
        <ConfettiContext.Provider value={{ isOpen, onOpen, onClose }}>
            <ReactConfetti
                className="pointer-events-none z-[100]"
                numberOfPieces={isOpen ? 500 : 0}
                recycle={false}
                onConfettiComplete={() => {
                    onClose();
                }}
            />
            {children}
        </ConfettiContext.Provider>
    )
};
