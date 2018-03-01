import time

from server.util.wrappers import DictObject


class ResultFilter(DictObject):
    def __init__(self, form):
        self.conditions = "timestamp BETWEEN ? AND ?"
        self.arguments = [ResultFilter._get_time(form.start_time), ResultFilter._get_time(form.end_time)]

    def add(self, key, value):
        if value is not None and value != '':
            self.conditions += " AND {} = ?".format(key)
            self.arguments.append(value)
        return self

    @staticmethod
    def _get_time(timestamp):
        result = timestamp.data
        if result < 0:
            result += time.time()
        return result


class VoteAggregator:
    AGGREGATORS = {
        'tod': 'time_of_day(timestamp)',
        'dow': 'day_of_week(timestamp)',
        'loc': 'logical_loc'
    }

    def __init__(self, group_by=None):
        if group_by is None:
            self.expr, self.group_by = '', ''
            return
        self.expr = VoteAggregator.AGGREGATORS[group_by] + ' as agg, '
        self.group_by = ' GROUP BY agg'
