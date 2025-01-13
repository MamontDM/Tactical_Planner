

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] - useState({
        fontsize: '16px',
        color: '#fff000',
    });

    const handleSetFontSize = (value) => {
        setTextSettings((prev) => ({...prev, fontsize: value}));
    };
    const handleSetColor = (value) => {
        setTextSettings((prev) => ({...prev, color: value}));
    };
}