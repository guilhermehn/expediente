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
  -c, --config <file>      choose config file
  -s, --simple             output finish time only
```

## Example
```
$ expediente 10:42
Start     10:42
Remaining 02:26
Minimum   20:15
Finish    20:30
Limit     20:45

$ expediente 10:42 -s
20:30
```

## Arguments
- `HH:mm`: Start time

## Optional Arguments
- `-h HH:mm`: Expedient duration *(defaults to 9:48)*
- `-t HH:mm`: Tolerance time after expedient *(defaults to 00:15)*
- `-s`: Output simple info
- `-c`: JSON config file path

## Config
If the file `~/.expedienteconfig.json` exists, expediente will
use it's contents as settings for default expedient duration
and tolerance time. Any command line argument will override the file config.

### Example config file
```javascript
{
  "hours": "9:00",     // Expedient duration
  "tolerance": "0:10", // Tolerance time
  "simple": true       // Always output simplified info
}
```

## License
MIT
