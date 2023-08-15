const handlersGlobal = {};

export default class EventsManager {
  static myInstance = null;
  comment = null;

  static getInstance() {
    if (this.myInstance === null) {
      this.myInstance = new EventsManager();
    }
    return this.myInstance;
  }

  on(event, handler) {
    if (!handlersGlobal[event]) {
      handlersGlobal[event] = [];
    }
    handlersGlobal[event].push(handler);
  }

  off(event, handler) {
    if (handlersGlobal[event]) {
      handlersGlobal[event] = handlersGlobal[event].filter(v => v !== handler);
    }
  }

  _emit(event, ...args) {
    const handlers = handlersGlobal[event];
    if (handlers) {
      for (const handler of handlers) {
        handler(...args);
      }
    }
  }
}
