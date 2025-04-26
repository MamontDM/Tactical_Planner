import { create } from "zustand";

export const useModalStore = create((set) => ({
    activeModal: null,
    modalProps: null,
    openModal: (modalName, props = null) => 
        set({ activeModal: modalName, modalProps: props}),
    closeModal: () => set({ activeModal: null, modalProps: null}),
}));

export const useNotificationStore = create((set) => ({
    notifications: null,
    addNotification: (message, duration = 3000) => {
        const id = Date.now();
        set({
            notifications: { id, message},
        });

     setTimeout(() => {
        set({
            notifications : null,
          });
        }, duration);   
    }
}));