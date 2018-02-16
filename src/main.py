from argparse import ArgumentParser

from server.run import run_server
from constants import LOG_FILE

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--host', action='append_const', const=str, default='0.0.0.0',
                        help='Specifies the server host name. Defaults to %(default)s.')
    parser.add_argument('--port', action='append_const', const=int, default=8000,
                        help='Specifies the server port number. Defaults to %(default)s.')
    parser.add_argument('--debug', action='store_true',
                        help='Allows for the hot-swap of server code and prints verbose logging to STDERR.')
    args = parser.parse_args()
    run_server(**vars(args), log_file=None if args.debug else LOG_FILE)
