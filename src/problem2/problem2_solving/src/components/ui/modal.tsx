import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area"

export const Modal = ({ children, requestClose }: { children: ReactNode, requestClose: () => void }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    delay: 0,
                    duration: 0.4,
                    ease: "easeInOut",
                }}
                className="fixed h-screen w-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 bg-black bg-opacity-25 backdrop-blur"
            >
                <div className="fixed h-[600px] w-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 p-10 px-4 rounded z-50 overflow-y-hidden">
                    <button onClick={requestClose} className="absolute top-1 right-2 p-2 font-bold text-sky-300 text-2xl">X</button>
                    <ScrollArea className="z-50 h-[480px] mt-6 w-full">
                        {children}
                    </ScrollArea>
                </div>
            </motion.div >
        </>
    );
};

