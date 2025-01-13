

const TextToolSettings = ({onChangeToolSettings}) => {
    const [textSetttings, setTextSettings] - useState({
        fontsize: '16px',
        color: '#fff000',
    });

    const handleSetFontSize = (value) => {
        setTextSettings((prev) => ({...prev, fontsize: value}));
    };
    const handleSetColor = (color) => {
        setTextSettings((prev) => ({...prev, color: value}));
    };

    useEffect(() => { 
        if(onChangeToolSettings){
            onChangeToolSettings(textSetttings);
        }
    }, [textSetttings]);


    return (
        <>
        <h2>Text Settings</h2>
        </>
    )
}