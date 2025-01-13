import React, {useState, useEffect, useRef}  from 'react';
import './dropdownSearch.css';


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
            item.name.toLowerCase().startsWith(searchReq.toLowerCase())
        );
        setFilteredData(results);
    }, [searchReq, data]);
   

    useEffect(() => {
        const hanadleOutsideClick = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                console.log('popal')
                setIsOpen(false);
            }
        };

        if(isOpen){
            document.addEventListener('mousedown', hanadleOutsideClick);
        }
        return (isOpen) => {
            document.removeEventListener('mousedown', hanadleOutsideClick);
        };
    }, [isOpen]);
   
    return  (
        <div ref={dropdownRef} className="dropdown-container">
        <input
            type="text"
            value={searchReq}
            onChange={e => setSearchReq(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
        />

        {isOpen && (
            <ul className="dropdown-list">
                {filteredData.length > 0 ? (
                    filteredData.map(item => (
                        <li
                            key={item.name}
                            className="dropdown-item"
                            onClick={() => {
                                setSearchReq(''); 
                                setIsOpen(false);
                                onSelect(item);
                            }}
                        >
                            {item.name}
                        </li>
                    ))
                ) : (
                    <li className="dropdown-no-results">No results found</li>
                )}
            </ul>
        )}
    </div>
);
}

export default DropdownSearch;