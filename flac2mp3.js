const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

let track = './source.mp3';//your path to source file

const func = (file) => {
    const name = file.split('.flac')[0]

    ffmpeg(file)
        .toFormat('mp3')
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message);
        })
        .on('progress', (progress) => {
            // console.log(JSON.stringify(progress));
            console.log('Processing: ' + progress.targetSize + ' KB converted');
        })
        .on('end', () => {
            console.log('Processing finished !');
        })
        .save(`${name}.mp3`);//path where you want to save your file
}

const testFolder = './tmp/';
const list = []

fs.readdirSync(testFolder).forEach(file => {
    list.push(file)
    func(`${testFolder}${file}`)
});


