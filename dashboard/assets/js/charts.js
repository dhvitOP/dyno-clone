function initChart(selector, ...log) {
  new Chartist.Line(selector, {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [...log]
  }, { low: Math.min(log), showArea: true });
}

initChart('.joins-chart', joinsLog, leavesLog);
initChart('.punishments-chart', punishmentsLog);
initChart('.messages-chart', messagesLog);
initChart('.commands-chart', commandsLog);