import React, {useState, useEffect, useRef}  from 'react';

function DropdownSearch({dataSource, onSelect, placeholder = `Search...`}) {
    const [data, setData] = useState([]);
    const [searchReq, setSearchReq] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (typeof dataSource === 'string') {
            fetch(dataSource)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                })
                .then(json => setData(json))
                .catch(error => console.error('Ошибка загрузки данных:', error));
        } else if (Array.isArray(dataSource)) {
            setData(dataSource);
        } else {
            console.error('Неподдерживаемый источник данных');
        }
    }, [dataSource]);

    useEffect(() => {
        const results = data.filter(item =>
            item.name.toLowerCase().includes(searchReq.toLowerCase())
        );
        setFilteredData(results);
    }, [searchReq, data]);
   

    useEffect(() => {
        const hanadleOutsideClick = (event) => {
            console.log(dropdownRef.current)
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                console.log('popal')
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', hanadleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', hanadleOutsideClick);
        };
    }, []);
   
    return  (
        <div ref={dropdownRef} style={{ position: 'relative', width: '300px' }}>
        <input
            type="text"
            value={searchReq}
            onChange={e => setSearchReq(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
            }}
        />

        {isOpen && (
            <ul
                style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1000
                }}
            >
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <li
                            key={item.id}
                            onClick={() => {
                                setSearchReq(э); 
                                setIsOpen(false);
                                onSelect(item);
                            }}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #eee'
                            }}
                        >
                            {item.name}
                        </li>
                    ))
                ) : (
                    <li style={{ padding: '10px', color: '#888' }}>No results found</li>
                )}
            </ul>
        )}
    </div>
);
}

export default DropdownSearch;