import argparse
import io
import os
from unittest import TextTestRunner, TestLoader

import coverage

ROOT_FOLDER = os.path.dirname(__file__)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--coverage', action='store_true')

    if parser.parse_args().coverage:
        cov = coverage.Coverage(branch=True, source=[os.path.join(ROOT_FOLDER, 'server')],
                                omit=['*__init__.py', '*test.py'], concurrency=['multiprocessing'])
        cov.start()

        # Send test results to a StringIO to silence it as much as possible. It is not relevant while doing coverage.
        TextTestRunner(stream=io.StringIO()).run(TestLoader().discover(start_dir=ROOT_FOLDER, pattern='*test.py'))

        cov.stop()
        cov.html_report(directory=os.path.join(ROOT_FOLDER, 'coverage_report'))
    else:
        TextTestRunner(verbosity=2).run(TestLoader().discover(start_dir=ROOT_FOLDER, pattern='*test.py'))
