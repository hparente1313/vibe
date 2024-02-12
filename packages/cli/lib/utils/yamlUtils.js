import { readFileSync, writeFileSync } from 'fs'
import * as yaml from 'js-yaml'

export function readYAML(filepath) {
    try {
        const tmpFile = readFileSync(filepath, 'utf-8')
        return yaml.load(tmpFile)
    } catch (err) {
        console.error('Error reading or parsing the file: ', err)
    }
}

export function populateYAMLField(filepath, field, value) {
    const data = readYAML(filepath)

    if (data) {
        if (field in data) {
            data[field] = value

            try {
                writeFileSync(filepath, yaml.dump(data))
            } catch (err) {
                console.error(`Error writing to the file '${filepath}': `, err)
            }
        } else {
            console.error(`Field '${field}' not found in file '${filepath}'`)
        }
    }
}
