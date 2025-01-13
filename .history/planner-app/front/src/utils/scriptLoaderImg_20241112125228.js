const fs = require('fs');
const path = require('path');

const iconFolderPath = path.join(__dirname, '../src/assets/Icon');
const outputFilePath = path.join(__dirname, '../src/assets/exportIcon.js');
console.log(iconFolderPath);

fs.readdir(iconFolderPath, (err, files) =>{
    if(err) throw err;

    const imports = files.map((file) =>{
        const iconName = path.parse(file).name;
        return `import ${iconName} from './Icon/${file}';`;
    });
    const exports = `export {\n${files.map((file) => path.parse(file).name).join(',\n')}\n};\n`;

    const content = `${imports.join('\n')}\n\n${exports}`;
    fs.writeFileSync(outputFilePath, content);
    console.log('Icon import is generated');

})
