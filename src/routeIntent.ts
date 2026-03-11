type QueuedRouteIntent = {
  fromTabSwitch: boolean;
  targetTabId?: string;
};

let queuedIntent: QueuedRouteIntent = {
  fromTabSwitch: false,
};
let queuedResetTimer: ReturnType<typeof setTimeout> | undefined;

function clearQueuedRouteIntent() {
  queuedIntent = {
    fromTabSwitch: false,
  };
  if (queuedResetTimer) {
    clearTimeout(queuedResetTimer);
    queuedResetTimer = undefined;
  }
}

function armIntentReset() {
  armIntentResetWithDelay(1000);
}

function armIntentResetWithDelay(delayMs: number) {
  if (queuedResetTimer) {
    clearTimeout(queuedResetTimer);
  }
  queuedResetTimer = setTimeout(() => {
    clearQueuedRouteIntent();
  }, delayMs);
}

export function queueTabSwitchNavigation(tabId: string) {
  queuedIntent = {
    fromTabSwitch: true,
    targetTabId: tabId,
  };
  armIntentReset();
}

export function clearQueuedRouteIntentNow() {
  clearQueuedRouteIntent();
}

export function peekQueuedRouteIntent(): QueuedRouteIntent {
  return queuedIntent;
}

export function consumeQueuedRouteIntent(): QueuedRouteIntent {
  const intent = queuedIntent;
  clearQueuedRouteIntent();
  return intent;
}

export function expireQueuedRouteIntentSoon(delayMs = 100) {
  if (!queuedIntent.fromTabSwitch) {
    return;
  }
  armIntentResetWithDelay(delayMs);
}
