import { readFileSync } from 'fs'


export const cliPackage = JSON.parse(
    readFileSync(
        new URL('../../package.json', import.meta.url),
        'utf-8'
    )
)
