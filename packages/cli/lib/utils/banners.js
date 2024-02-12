import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import gradient from 'gradient-string'

import { promptColors } from '../prompts/promptStyles.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


function bannerGradient(gradientColors, string) {
    return gradient(gradientColors)(string)
}


export function logArtFromFile (filePath, operation = () => {}) {
    const file = readFileSync(
    join(__dirname, filePath),
    'utf-8'
    )
    if (operation) {
        const lines = file.split('\n')
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            const modifiedLine = operation(line)
            console.log(modifiedLine)
        }
    } else {
        console.log(file)
    }
}

export function logVibeBanner () {
    const filePath = '../../assets/banner.art'
    function bannerGradientOperation(line) {
        if (typeof line === 'string') {
            return bannerGradient(promptColors['bannerGradientColors'], line)
        }
    }
    logArtFromFile(filePath, bannerGradientOperation)
}
