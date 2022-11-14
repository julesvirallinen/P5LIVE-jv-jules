const path = require('path')
const fs = require('fs')

const compareNameAlphabeticallyAsc = (path1, path2) => {
    if (path2.type === 'folder') {
        return 1
    }

    return path2.name.localeCompare(path1.name)
}

const getPathsInDirectory = (directory, files) => {
    const filesInDirectory = fs.readdirSync(directory)

    if (!filesInDirectory.length) {
        return files
    }
    for (const file of filesInDirectory) {
        const absolute = `${directory}/${file}`
        if (fs.statSync(absolute).isDirectory()) {
            const subPaths = getPathsInDirectory(absolute, [])
            const sortedSubpaths = subPaths.sort(compareNameAlphabeticallyAsc)
            files = [
                {
                    name: file,
                    type: 'folder',
                    contents: sortedSubpaths,
                    toggle: 'collapse',
                },
                ...files,
            ]
        } else {
            const code = fs.readFileSync(absolute, {
                encoding: 'utf8',
            })

            files = [
                ...files,
                {
                    type: 'sketch',
                    mod: new Date().getTime(),
                    name: path.basename(file, '.js'),
                    code,
                },
            ]
        }
    }
    return files
}

module.exports.loadAll = (dir) => {
    const files = getPathsInDirectory(dir, [])

    return files.sort(compareNameAlphabeticallyAsc)
}
