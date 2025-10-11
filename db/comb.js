// Запуск node comb.js
const fs = require('fs');
const path = require('path');

// Папка, где находятся ваши JSON файлы
const directoryPathTest = path.join(__dirname, 'tests');
const directoryPathPractickes = path.join(__dirname, 'practices');

function mergingJsonFiles(directory, nameFiles){
    let combinedData = []; // Массив для хранения объединенных данных
    let index = 1; // Начальный индекс для ключей

    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.log('Ошибка при чтении директории: ' + err);
        }

        // Фильтрация только JSON файлов
        files = files.filter(file => file.endsWith('.json'));

        // Чтение и объединение данных из каждого JSON файла
        files.forEach(file => {
            const filePath = path.join(directory, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            // Предполагается, что каждый файл содержит массив объектов
            data.forEach(test => {
                // Создаем объект с уникальным ключом и данными теста
                combinedData.push({
                    [`${index}`]: test
                });
                index++; // Увеличиваем индекс для следующего теста
            });
        });

        // Запись объединенных данных в новый файл
        fs.writeFileSync(path.join(__dirname, `combinedFiles/${nameFiles}`), JSON.stringify(combinedData, null, 4)); 
        console.log(`Объединенные данные сохранены в combinedFiles/${nameFiles}`);
    });

}

mergingJsonFiles(directoryPathTest, 'allTests.json');
mergingJsonFiles(directoryPathPractickes, 'allPractices.json');
