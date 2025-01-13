const fs = require('fs');
const path = require('path');

const iconFolderPath = path.join(__dirname, '../assets/maps');
const outputFilePath = path.join(__dirname, '../assets/exportMaps.js');
console.log(iconFolderPath);

fs.readdir(iconFolderPath, (err, files) =>{
    if(err) throw err;

    const imports = files.map((file) =>{
        const iconName = path.parse(file).name;
        return `import ${iconName} from './maps/${file}';`;
    });
    const exports = `export {\n${files.map((file) => path.parse(file).name).join(',\n')}\n};\n`;

    const content = `${imports.join('\n')}\n\n${exports}`;
    fs.writeFileSync(outputFilePath, content);
    console.log('Import was success');

})
