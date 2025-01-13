

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

    const handleSetLabel = (label) => {
        setSettings((prev) => ({ ...prev, shipLabel: label }));
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
            <input
                type="text"
                onChange={(e) => }
            >
            </input>
        </div>
        </>
    )
}