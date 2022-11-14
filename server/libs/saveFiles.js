fs = require('fs')

const sanitizeName = (string) =>
    string
        .trim()
        .replace(/[^a-zäö0-9-_]/gi, '_')
        .toLowerCase()

const saveSketch = (path, name, code) =>
    fs.writeFile(`${path}/${name}.js`, code, { flag: '' }, (err) => {})

module.exports.save = (sketch, dir) => {
    if (sketch.type === 'sketch') {
        let name = sanitizeName(sketch.name)
        saveSketch(dir, name, sketch.code)
    }
    if (sketch.type === 'folder') {
        let folderDir = `${dir}/${sanitizeName(sketch.name)}`
        console.log(folderDir)
        !fs.existsSync(folderDir) && fs.mkdirSync(folderDir)
        for (let item of sketch.contents) {
            this.save(item, folderDir)
        }
    }
}
