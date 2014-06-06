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
### `HH:mm` ###
Start time

### `-h HH:mm` ###
Expedient duration (defaults to 9h48)

### `-t HH:mm` ###
Tolerance time after expedient (defaults to 20m)

### `-D` ###
Outputs detailed info

## License ##
MIT