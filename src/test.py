import argparse
import io
import os
from unittest import TextTestRunner, TestLoader

import coverage
import logging

ROOT_FOLDER = os.path.dirname(__file__)
SERVER_FOLDER = os.path.join(ROOT_FOLDER, 'server')
COVERAGE_REPORT = os.path.join(ROOT_FOLDER, 'coverage_report')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--coverage', action='store_true')

    # Disable logging to reduce spam during testing.
    logging.disable(logging.CRITICAL)

    if parser.parse_args().coverage:
        cov = coverage.Coverage(branch=True, source=[SERVER_FOLDER], concurrency=['multiprocessing'],
                                omit=['*test.py', '*server/run.py', '*server/static.py'])
        cov.start()

        # Send test results to a StringIO to silence it as much as possible. It is not relevant while doing coverage.
        TextTestRunner(stream=io.StringIO()).run(TestLoader().discover(start_dir=ROOT_FOLDER, pattern='*test.py'))

        cov.stop()
        statement_coverage = cov.html_report(directory=os.path.join(ROOT_FOLDER, 'coverage_report'))
        print("Statement coverage is {:.2f}%. See {}/index.html for full report.".format(statement_coverage,
                                                                                         COVERAGE_REPORT))
    else:
        TextTestRunner(verbosity=2).run(TestLoader().discover(start_dir=ROOT_FOLDER, pattern='*test.py'))
