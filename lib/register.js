class Register {
  
  constructor() {
    this.actions = {};
    this.latestAction;
  }

  setActionInfo(id, status, timeInMillis) {
    this.actions[id] = {
      status: status,
      timeInMillis: timeInMillis,
      counter: ((this.actions[id] || { counter: 0 }).counter) + 1
    };
    this._setLatestActionInfo(id, status, timeInMillis);
  }

  _setLatestActionInfo(id, status, timeInMillis) {
    this.latestAction = {
      id: id,
      status: status,
      timeInMillis: timeInMillis,
      counter: ((this.latestAction || { counter: 0 }).counter) + 1
    };
  }

  getActionInfo(id) {
    return this.actions[id];
  }

  getLatestAction() {
    return this.latestAction;
  }

}

export {
  Register as default
};