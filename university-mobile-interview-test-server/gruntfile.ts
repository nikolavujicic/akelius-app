import { Options, command } from 'execa'
import { initConfig, loadNpmTasks, registerTask } from 'grunt'
import { rimrafSync } from 'rimraf'

loadNpmTasks('grunt-contrib-copy')
loadNpmTasks('grunt-eslint')

initConfig({
  copy: {
    jsons: {
      expand: true,
      cwd: 'src',
      src: '**/*.json',
      dest: 'dist',
    },
  },

  eslint: {
    src: ['src/**/*.ts'],
    options: {
      failOnError: true,
    },
  },

  run: {
    start: {
      cmd: 'node artefacts/src/index.js',
      args: [],
    },
  },
})

registerTask('build', ['eslint', 'task:cleanup', 'task:tsc', 'task:start'])
registerTask('default', ['build'])

registerTask('task:cleanup', function (): void {
  const done = this.async()

  const wasSuccessful = rimrafSync(['dist'])

  done(wasSuccessful)
})

registerTask('task:tsc', async function () {
  const done = this.async()

  const commandResult = await runShellCommand('tsc -b tsconfig.json')

  done(commandResult)
})

registerTask('task:start', async function () {
  const done = this.async()

  const commandResult = await runShellCommand('node dist/index.js')

  done(commandResult)
})

async function runShellCommand(shellCommand: string, options?: Options): Promise<boolean> {
  const execCaOptions: Options = { ...options, shell: true, stdio: 'inherit' }

  const commandResult = await command(shellCommand, execCaOptions)
  if (commandResult.failed) {
    console.log(`Command has failed: ${commandResult.command}`)
    console.log(`Command has failed: ${commandResult.stderr}`)
    console.log(`Command has failed: ${commandResult.stdout}`)

    return false
  }

  return true
}
