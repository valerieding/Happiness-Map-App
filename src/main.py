from argparse import ArgumentParser

from server.run import run_server
from constants import LOG_FILE

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--host', action='append_const', const=str, default='localhost')
    parser.add_argument('--port', action='append_const', const=int, default=8000)
    parser.add_argument('--debug', action='store_true')
    args = parser.parse_args()
    run_server(**vars(args), log_file=None if args.debug else LOG_FILE)
