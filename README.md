# expediente #
Expedient info CLI

## Usage ##
      Usage: expediente <HH:mm> [options]

      Options:

        -h, --help               output usage information
        -V, --version            output the version number
        -h, --hours <HH:mm>      hours [HH:mm]
        -t, --tolerance <HH:mm>  tolerance [HH:mm]
        -D, --detailed           detailed result

## Example ##
    $ expediente 10:42
    20:30

## Arguments ##
- `HH:mm`: Start time

## Optional Arguments ##
- `-h`: `HH:mm` Expedient duration *(defaults to **9:48**)*
- `-t`: `HH:mm` Tolerance time after expedient *(defaults to **00:20**)*
- `-D`: Outputs detailed info
- `-c`: JSON config file path

## Config ##
If the file `~/.expedienteconfig.json` exists, expediente will
use it's contents as settings for default expedient duration
and tolerance time. Any command line argument will override the file config.

### Example config file ###
```javascript
{
  "hours": "9:00",     // Expedient duration
  "tolerance": "0:10", // Tolerance time
  "detailed": true     // Always output detailed info
}
```

## License ##
MIT
