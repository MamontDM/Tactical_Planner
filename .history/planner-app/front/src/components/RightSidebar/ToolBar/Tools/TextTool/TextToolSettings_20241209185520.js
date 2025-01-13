

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] - useState({
        textBody: 'test',
        fontsize: '16px',
        color: '#fff000',
    });

    const handleSetFontSize = (value) => {
        setTextSettings((prev) => ({...prev, fontsize: value}));
    };
    const handleSetColor = (color) => {
        setTextSettings((prev) => ({...prev, color: value}));
    };

    const handleSetBody = (value) => {
        setTextSettings((prev) => ({ ...prev, textBody: value }));
    };

    useEffect(() => { 
        if(onChangeToolSettings){
            onChangeToolSettings(textSetttings);
        }
    }, [textSetttings]);


    return (
        <>
        <h2>Text Settings</h2>
        <div className="text-settings-list">
        <h3>Type Message</h3>
            <input
                type="text"
                onChange={(e) => handleSetBody()}
                defaultValue = {textSetttings.textBody}>
            </input>
        <h2>Text Size</h2>
        <input
                type="range"
                min="16"
                max="152"
                onChange={(e) => handleSetFontSize()}
                defaultValue = {textSetttings.fontsize}>
            </input>
        </div>
        </>
    )
}