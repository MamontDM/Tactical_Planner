import { create } from "zustand";

const defaultSettings = {
    icon:  { color: '#fff000', shipType: null, label: 'USS' },
    line:  { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
    tech:  { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
    curve: { color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
    vision:{ color: 'rgba(135, 255, 0, 1)', lineWidth: 2 },
    radar: { color: 'rgba(135, 255, 0, 1)', lineWidth: 2, range: null },
    text:  { textBody: 'test', fontSize: '16', color: '#fff000'},
    base:  { textBody: 'A', 
             color: 'rgba(136, 255, 0, 1)', 
             lineWidth: 2, 
             range: null, 
             textColor: '#000',
             fontSize: '25',  
        },
};


const useToolSettings = create((set, get) =>({
    activeToolKey: null,
    settings: {},
    setActiveKey: (key) => ({activeToolKey: key}),

    getSettings: (key) => {
        return (get().settings[key] || defaultSettings[key])},

    updateSettings: (key, newSettings) => 
        set((state) => ({
            settings: {
                ...state.settings, 
            [key]: {...defaultSettings[key], ...state.settings[key], ...newSettings}},
    })),
    resetSettings: (key) => 
        set((state) => ({
            settings: {...state.settings, [key]: { ...defaultSettings[key]}},
        })),
}));

export default useToolSettings;