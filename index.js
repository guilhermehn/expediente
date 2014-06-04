var argv = require('minimist')(process.argv.slice(2))
  , lib = require('./lib')
  , result
  , log = console.log

function logV (result) {
  console.log('Entrada:', result.entrada)
  console.log('Saída:  ', result.saida)
  console.log('Limite: ', result.limite)
}

lib.expediente = lib.expediente.bind(this, argv._[0])

if (argv._[1]) {
  lib.expediente = lib.expediente.bind(this, argv._[1])
}

if (argv.V) {
  lib.expediente = lib.expediente.bind(this, true)
  log = logV
}

result = lib.expediente()
if (result) {
  log(result)
}
else {
  lib.usage()
}
