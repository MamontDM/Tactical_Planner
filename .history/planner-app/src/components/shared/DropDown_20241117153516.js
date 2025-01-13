import React, {useState, useEffect}  from 'react';

function DropdownSearch({dataSource, onSelect, placeholder = `Search...`}) {
    const [data, setData] = useState([]);
    const [searchReq, setSearchreq] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isOpen, setisOpen] = useState(false);

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
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
    }, [searchTerm, data]);
    return  (
        <div></div>
    )
},