#!/usr/bin/env node
import updateNotifier from 'update-notifier'
import { Command } from 'commander'
import Enquirer from 'enquirer'
import chalk from 'chalk'

// Local Imports
import { promptIcons } from '../lib/prompts/promptStyles.js'
import { promptColors } from '../lib/prompts/promptStyles.js'
import { validateNodeVersion } from '../lib/utils/validateNodeVersion.js'
import { logVibeBanner } from '../lib/utils/banners.js'
import { cliPackage } from '../lib/utils/cliPackage.js'


const notifier = updateNotifier({pkg: cliPackage})
const { Select } = Enquirer

validateNodeVersion()
logVibeBanner()
notifier.notify()


const program = new Command()
const cliPackageVersion = cliPackage['version']

program.name('Vibe CLI')
    .description('CLI for Vibe framework')
    .version(`${cliPackageVersion}`, '-v, --version', 'Outputs the current CLI version')


const initCLISelect = new Select({
    name: 'initCLISelect',
    message: 'What would you like to do?',
    symbols: {
        pointer: {
          on: chalk.hex(promptColors['primaryPurple']).visible(promptIcons['singleSelectPointer']),
          off: ' '
      }
    },
    choices: [
        'Create a new Vibe app',
        'Build a custom theme for Axion'
    ],
    prefix(state) {
        switch (state.status) {
            case 'pending': return 'pending'
            case 'cancelled': return 'cancelled'
            case 'submitted': return 'submitted'
        }
    }
})

program.command('vibe')
    .alias('vb')
    .description('Initializes Vibe CLI')
    .action(() => {
        initCLISelect
            .run()
            .then(answer => console.log(answer))
            .catch(console.error)
    })

program.command('create <appName>')
    .alias('c')
    .description('Create a new Vibe app')
    .action((appName) => {
        console.log(`Creating '${appName}' using Vibe!`)
    })

program.parse()