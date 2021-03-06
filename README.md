# expediente
Expedient info CLI

## Usage ##
```
Usage: expediente <HH:mm> [options]

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -h, --hours <HH:mm>      hours [HH:mm]
  -t, --tolerance <HH:mm>  tolerance [HH:mm]
  -e, --early <HH:mm>      time to be subtracted from the duration
  -c, --config <file>      JSON config file path
  -f, --finish             output finish time only
  -m, --minimum            output minimum time only
```

## Example
```
$ expediente 10:42
Start     10:42
Remaining 02:26
Minimum   20:15
Finish    20:30
Limit     20:45

$ expediente 10:42 -f
20:30
```

## Arguments
- `HH:mm`: Start time

## Optional Arguments
- `-h HH:mm`: Expedient duration *(defaults to 9:48)*
- `-t HH:mm`: Tolerance time after expedient *(defaults to 00:15)*
- `-e HH:mm`: time to be subtracted from the duration
- `-s`: Output simple info
- `-c`: JSON config file path
- `-f`: Output finish time only
- `-m`: Output minimum time only

## Config
If the file `~/.expedienteconfig.json` exists, expediente will
use it's contents as settings for default expedient duration
and tolerance time. Any command line argument will override the file config.

### Example config file
```javascript
{
  "hours": "9:00",     // Expedient duration
  "tolerance": "0:10", // Tolerance time
  "minimum": true      // Always output minimum time only
}
```

## License
MIT
