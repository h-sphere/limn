import {
  __export,
  __publicField
} from "./chunk-UVKRO5ER.js";

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/api.mjs
var api_exports = {};
__export(api_exports, {
  EMPTY_ARRAY: () => EMPTY_ARRAY,
  EffectScheduler: () => EffectScheduler,
  RESET_VALUE: () => RESET_VALUE,
  atom: () => atom,
  computed: () => computed,
  getComputedInstance: () => getComputedInstance,
  isAtom: () => isAtom,
  isSignal: () => isSignal,
  isUninitialized: () => isUninitialized,
  react: () => react,
  reactor: () => reactor,
  transact: () => transact,
  transaction: () => transaction,
  unsafe__withoutCapture: () => unsafe__withoutCapture,
  whyAmIRunning: () => whyAmIRunning,
  withDiff: () => withDiff
});

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/ArraySet.mjs
var ARRAY_SIZE_THRESHOLD = 8;
var ArraySet = class {
  constructor() {
    __publicField(this, "arraySize", 0);
    __publicField(this, "array", Array(ARRAY_SIZE_THRESHOLD));
    __publicField(this, "set", null);
  }
  /**
   * Get whether this ArraySet has any elements.
   *
   * @returns True if this ArraySet has any elements, false otherwise.
   */
  get isEmpty() {
    if (this.array) {
      return this.arraySize === 0;
    }
    if (this.set) {
      return this.set.size === 0;
    }
    throw new Error("no set or array");
  }
  /**
   * Add an item to the ArraySet if it is not already present.
   *
   * @param elem - The element to add.
   */
  add(elem) {
    if (this.array) {
      const idx = this.array.indexOf(elem);
      if (idx !== -1) {
        return false;
      }
      if (this.arraySize < ARRAY_SIZE_THRESHOLD) {
        this.array[this.arraySize] = elem;
        this.arraySize++;
        return true;
      } else {
        this.set = new Set(this.array);
        this.array = null;
        this.set.add(elem);
        return true;
      }
    }
    if (this.set) {
      if (this.set.has(elem)) {
        return false;
      }
      this.set.add(elem);
      return true;
    }
    throw new Error("no set or array");
  }
  /**
   * Remove an item from the ArraySet if it is present.
   *
   * @param elem - The element to remove
   */
  remove(elem) {
    if (this.array) {
      const idx = this.array.indexOf(elem);
      if (idx === -1) {
        return false;
      }
      this.array[idx] = void 0;
      this.arraySize--;
      if (idx !== this.arraySize) {
        this.array[idx] = this.array[this.arraySize];
        this.array[this.arraySize] = void 0;
      }
      return true;
    }
    if (this.set) {
      if (!this.set.has(elem)) {
        return false;
      }
      this.set.delete(elem);
      return true;
    }
    throw new Error("no set or array");
  }
  /**
   * Run a callback for each element in the ArraySet.
   *
   * @param visitor The callback to run for each element.
   */
  visit(visitor) {
    if (this.array) {
      for (let i = 0; i < this.arraySize; i++) {
        const elem = this.array[i];
        if (typeof elem !== "undefined") {
          visitor(elem);
        }
      }
      return;
    }
    if (this.set) {
      this.set.forEach(visitor);
      return;
    }
    throw new Error("no set or array");
  }
};

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/helpers.mjs
function isChild(x) {
  return x && typeof x === "object" && "parents" in x;
}
function haveParentsChanged(child) {
  for (let i = 0, n = child.parents.length; i < n; i++) {
    child.parents[i].__unsafe__getWithoutCapture();
    if (child.parents[i].lastChangedEpoch !== child.parentEpochs[i]) {
      return true;
    }
  }
  return false;
}
var detach = (parent, child) => {
  if (!parent.children.remove(child)) {
    return;
  }
  if (parent.children.isEmpty && isChild(parent)) {
    for (let i = 0, n = parent.parents.length; i < n; i++) {
      detach(parent.parents[i], parent);
    }
  }
};
var attach = (parent, child) => {
  if (!parent.children.add(child)) {
    return;
  }
  if (isChild(parent)) {
    for (let i = 0, n = parent.parents.length; i < n; i++) {
      attach(parent.parents[i], parent);
    }
  }
};
function equals(a, b) {
  const shallowEquals = a === b || Object.is(a, b) || Boolean(a && b && typeof a.equals === "function" && a.equals(b));
  return shallowEquals;
}
var EMPTY_ARRAY = Object.freeze([]);

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/capture.mjs
var signiaKey = Symbol.for("__signia__");
var global = globalThis;
if (global[signiaKey]) {
  console.error(
    'Multiple versions of signia detected. This will cause unexpected behavior. Please add "resolutions" (yarn/pnpm) or "overrides" (npm) in your package.json to ensure only one version of signia is loaded.'
  );
} else {
  global[signiaKey] = true;
}
var CaptureStackFrame = class {
  constructor(below, child) {
    __publicField(this, "offset", 0);
    __publicField(this, "numNewParents", 0);
    __publicField(this, "maybeRemoved");
    this.below = below;
    this.child = child;
  }
};
var stack = null;
function unsafe__withoutCapture(fn) {
  const oldStack = stack;
  stack = null;
  try {
    return fn();
  } finally {
    stack = oldStack;
  }
}
function startCapturingParents(child) {
  stack = new CaptureStackFrame(stack, child);
}
function stopCapturingParents() {
  const frame = stack;
  stack = frame.below;
  const didParentsChange = frame.numNewParents > 0 || frame.offset !== frame.child.parents.length;
  if (!didParentsChange) {
    return;
  }
  for (let i = frame.offset; i < frame.child.parents.length; i++) {
    const p = frame.child.parents[i];
    const parentWasRemoved = frame.child.parents.indexOf(p) >= frame.offset;
    if (parentWasRemoved) {
      detach(p, frame.child);
    }
  }
  frame.child.parents.length = frame.offset;
  frame.child.parentEpochs.length = frame.offset;
  if (stack == null ? void 0 : stack.maybeRemoved) {
    for (let i = 0; i < stack.maybeRemoved.length; i++) {
      const maybeRemovedParent = stack.maybeRemoved[i];
      if (frame.child.parents.indexOf(maybeRemovedParent) === -1) {
        detach(maybeRemovedParent, frame.child);
      }
    }
  }
}
function maybeCaptureParent(p) {
  if (stack) {
    const idx = stack.child.parents.indexOf(p);
    if (idx < 0) {
      stack.numNewParents++;
      if (stack.child.isActivelyListening) {
        attach(p, stack.child);
      }
    }
    if (idx < 0 || idx >= stack.offset) {
      if (idx !== stack.offset && idx > 0) {
        const maybeRemovedParent = stack.child.parents[stack.offset];
        if (!stack.maybeRemoved) {
          stack.maybeRemoved = [maybeRemovedParent];
        } else if (stack.maybeRemoved.indexOf(maybeRemovedParent) === -1) {
          stack.maybeRemoved.push(maybeRemovedParent);
        }
      }
      stack.child.parents[stack.offset] = p;
      stack.child.parentEpochs[stack.offset] = p.lastChangedEpoch;
      stack.offset++;
    }
  }
}
function whyAmIRunning() {
  const child = stack == null ? void 0 : stack.child;
  if (!child) {
    throw new Error("whyAmIRunning() called outside of a reactive context");
  }
  const changedParents = [];
  for (let i = 0; i < child.parents.length; i++) {
    const parent = child.parents[i];
    if (parent.lastChangedEpoch > child.parentEpochs[i]) {
      changedParents.push(parent);
    }
  }
  if (changedParents.length === 0) {
    console.log(child.name, "is running but none of the parents changed");
  } else {
    console.log(child.name, "is running because:");
    for (const changedParent of changedParents) {
      console.log(
        "	",
        changedParent.name,
        "changed =>",
        changedParent.__unsafe__getWithoutCapture()
      );
    }
  }
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/types.mjs
var RESET_VALUE = Symbol("RESET_VALUE");

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/HistoryBuffer.mjs
var HistoryBuffer = class {
  constructor(capacity) {
    __publicField(this, "index", 0);
    // use a wrap around buffer to store the last N values
    __publicField(this, "buffer");
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }
  /**
   * Add a diff to the history buffer.
   *
   * @param lastComputedEpoch The epoch when the diff was computed.
   * @param currentEpoch The current epoch.
   * @param diff (optional) The diff to add, or else a reset value.
   */
  pushEntry(lastComputedEpoch, currentEpoch, diff) {
    if (diff === void 0) {
      return;
    }
    if (diff === RESET_VALUE) {
      this.clear();
      return;
    }
    this.buffer[this.index] = [lastComputedEpoch, currentEpoch, diff];
    this.index = (this.index + 1) % this.capacity;
  }
  /**
   * Clear the history buffer.
   */
  clear() {
    this.index = 0;
    this.buffer.fill(void 0);
  }
  /**
   * Get the diffs since the given epoch.
   *
   * @param epoch The epoch to get diffs since.
   * @returns An array of diffs or a flag to reset the history buffer.
   */
  getChangesSince(sinceEpoch) {
    const { index, capacity, buffer } = this;
    for (let i = 0; i < capacity; i++) {
      const offset = (index - 1 + capacity - i) % capacity;
      const elem = buffer[offset];
      if (!elem) {
        return RESET_VALUE;
      }
      const [fromEpoch, toEpoch] = elem;
      if (i === 0 && sinceEpoch >= toEpoch) {
        return [];
      }
      if (fromEpoch <= sinceEpoch && sinceEpoch < toEpoch) {
        const len = i + 1;
        const result = new Array(len);
        for (let j = 0; j < len; j++) {
          result[j] = buffer[(offset + j) % capacity][2];
        }
        return result;
      }
    }
    return RESET_VALUE;
  }
};

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/constants.mjs
var GLOBAL_START_EPOCH = -1;

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/transactions.mjs
var globalEpoch = GLOBAL_START_EPOCH + 1;
var globalIsReacting = false;
function advanceGlobalEpoch() {
  globalEpoch++;
}
var Transaction = class {
  constructor(parent) {
    __publicField(this, "initialAtomValues", /* @__PURE__ */ new Map());
    this.parent = parent;
  }
  /**
   * Get whether this transaction is a root (no parents).
   *
   * @public
   */
  get isRoot() {
    return this.parent === null;
  }
  /**
   * Commit the transaction's changes.
   *
   * @public
   */
  commit() {
    if (this.isRoot) {
      const atoms = this.initialAtomValues;
      this.initialAtomValues = /* @__PURE__ */ new Map();
      flushChanges(atoms.keys());
    } else {
      this.initialAtomValues.forEach((value, atom2) => {
        if (!this.parent.initialAtomValues.has(atom2)) {
          this.parent.initialAtomValues.set(atom2, value);
        }
      });
    }
  }
  /**
   * Abort the transaction.
   *
   * @public
   */
  abort() {
    globalEpoch++;
    this.initialAtomValues.forEach((value, atom2) => {
      var _a;
      atom2.set(value);
      (_a = atom2.historyBuffer) == null ? void 0 : _a.clear();
    });
    this.commit();
  }
};
function flushChanges(atoms) {
  if (globalIsReacting) {
    throw new Error("cannot change atoms during reaction cycle");
  }
  try {
    globalIsReacting = true;
    const reactors = /* @__PURE__ */ new Set();
    const traverse = (node) => {
      if (node.lastTraversedEpoch === globalEpoch) {
        return;
      }
      node.lastTraversedEpoch = globalEpoch;
      if ("maybeScheduleEffect" in node) {
        reactors.add(node);
      } else {
        ;
        node.children.visit(traverse);
      }
    };
    for (const atom2 of atoms) {
      atom2.children.visit(traverse);
    }
    for (const r of reactors) {
      r.maybeScheduleEffect();
    }
  } finally {
    globalIsReacting = false;
  }
}
function atomDidChange(atom2, previousValue) {
  if (!currentTransaction) {
    flushChanges([atom2]);
  } else if (!currentTransaction.initialAtomValues.has(atom2)) {
    currentTransaction.initialAtomValues.set(atom2, previousValue);
  }
}
var currentTransaction = null;
function transaction(fn) {
  const txn = new Transaction(currentTransaction);
  currentTransaction = txn;
  try {
    let rollback = false;
    const result = fn(() => rollback = true);
    if (rollback) {
      txn.abort();
    } else {
      txn.commit();
    }
    return result;
  } catch (e) {
    txn.abort();
    throw e;
  } finally {
    currentTransaction = currentTransaction.parent;
  }
}
function transact(fn) {
  if (currentTransaction) {
    return fn();
  }
  return transaction(fn);
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/Atom.mjs
var _Atom = class {
  constructor(name, current, options) {
    __publicField(this, "isEqual");
    __publicField(this, "computeDiff");
    __publicField(this, "lastChangedEpoch", globalEpoch);
    __publicField(this, "children", new ArraySet());
    __publicField(this, "historyBuffer");
    this.name = name;
    this.current = current;
    this.isEqual = (options == null ? void 0 : options.isEqual) ?? null;
    if (!options)
      return;
    if (options.historyLength) {
      this.historyBuffer = new HistoryBuffer(options.historyLength);
    }
    this.computeDiff = options.computeDiff;
  }
  __unsafe__getWithoutCapture() {
    return this.current;
  }
  get value() {
    maybeCaptureParent(this);
    return this.current;
  }
  set(value, diff) {
    var _a, _b;
    if (((_a = this.isEqual) == null ? void 0 : _a.call(this, this.current, value)) ?? equals(this.current, value)) {
      return this.current;
    }
    advanceGlobalEpoch();
    if (this.historyBuffer) {
      this.historyBuffer.pushEntry(
        this.lastChangedEpoch,
        globalEpoch,
        diff ?? ((_b = this.computeDiff) == null ? void 0 : _b.call(this, this.current, value, this.lastChangedEpoch, globalEpoch)) ?? RESET_VALUE
      );
    }
    this.lastChangedEpoch = globalEpoch;
    const oldValue = this.current;
    this.current = value;
    atomDidChange(this, oldValue);
    return value;
  }
  update(updater) {
    return this.set(updater(this.current));
  }
  getDiffSince(epoch) {
    var _a;
    maybeCaptureParent(this);
    if (epoch >= this.lastChangedEpoch) {
      return EMPTY_ARRAY;
    }
    return ((_a = this.historyBuffer) == null ? void 0 : _a.getChangesSince(epoch)) ?? RESET_VALUE;
  }
};
function atom(name, initialValue, options) {
  return new _Atom(name, initialValue, options);
}
function isAtom(value) {
  return value instanceof _Atom;
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/Computed.mjs
var UNINITIALIZED = Symbol("UNINITIALIZED");
var isUninitialized = (value) => {
  return value === UNINITIALIZED;
};
var WithDiff = class {
  constructor(value, diff) {
    this.value = value;
    this.diff = diff;
  }
};
function withDiff(value, diff) {
  return new WithDiff(value, diff);
}
var _Computed = class {
  constructor(name, derive, options) {
    __publicField(this, "lastChangedEpoch", GLOBAL_START_EPOCH);
    __publicField(this, "lastTraversedEpoch", GLOBAL_START_EPOCH);
    /**
     * The epoch when the reactor was last checked.
     */
    __publicField(this, "lastCheckedEpoch", GLOBAL_START_EPOCH);
    __publicField(this, "parents", []);
    __publicField(this, "parentEpochs", []);
    __publicField(this, "children", new ArraySet());
    __publicField(this, "historyBuffer");
    // The last-computed value of this signal.
    __publicField(this, "state", UNINITIALIZED);
    __publicField(this, "computeDiff");
    __publicField(this, "isEqual");
    this.name = name;
    this.derive = derive;
    if (options == null ? void 0 : options.historyLength) {
      this.historyBuffer = new HistoryBuffer(options.historyLength);
    }
    this.computeDiff = options == null ? void 0 : options.computeDiff;
    this.isEqual = (options == null ? void 0 : options.isEqual) ?? equals;
  }
  get isActivelyListening() {
    return !this.children.isEmpty;
  }
  __unsafe__getWithoutCapture() {
    var _a;
    const isNew = this.lastChangedEpoch === GLOBAL_START_EPOCH;
    if (!isNew && (this.lastCheckedEpoch === globalEpoch || !haveParentsChanged(this))) {
      this.lastCheckedEpoch = globalEpoch;
      return this.state;
    }
    try {
      startCapturingParents(this);
      const result = this.derive(this.state, this.lastCheckedEpoch);
      const newState = result instanceof WithDiff ? result.value : result;
      if (this.state === UNINITIALIZED || !this.isEqual(newState, this.state)) {
        if (this.historyBuffer && !isNew) {
          const diff = result instanceof WithDiff ? result.diff : void 0;
          this.historyBuffer.pushEntry(
            this.lastChangedEpoch,
            globalEpoch,
            diff ?? ((_a = this.computeDiff) == null ? void 0 : _a.call(this, this.state, newState, this.lastCheckedEpoch, globalEpoch)) ?? RESET_VALUE
          );
        }
        this.lastChangedEpoch = globalEpoch;
        this.state = newState;
      }
      this.lastCheckedEpoch = globalEpoch;
      return this.state;
    } finally {
      stopCapturingParents();
    }
  }
  get value() {
    const value = this.__unsafe__getWithoutCapture();
    maybeCaptureParent(this);
    return value;
  }
  getDiffSince(epoch) {
    var _a;
    this.value;
    if (epoch >= this.lastChangedEpoch) {
      return EMPTY_ARRAY;
    }
    return ((_a = this.historyBuffer) == null ? void 0 : _a.getChangesSince(epoch)) ?? RESET_VALUE;
  }
};
function computedAnnotation(options = {}, _target, key, descriptor) {
  const originalMethod = descriptor.get;
  const derivationKey = Symbol.for("__signia__computed__" + key);
  descriptor.get = function() {
    let d = this[derivationKey];
    if (!d) {
      d = new _Computed(key, originalMethod.bind(this), options);
      Object.defineProperty(this, derivationKey, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: d
      });
    }
    return d.value;
  };
  return descriptor;
}
function getComputedInstance(obj, propertyName) {
  const key = Symbol.for("__signia__computed__" + propertyName.toString());
  let inst = obj[key];
  if (!inst) {
    obj[propertyName];
    inst = obj[key];
  }
  return inst;
}
function computed() {
  if (arguments.length === 1) {
    const options = arguments[0];
    return (target, key, descriptor) => computedAnnotation(options, target, key, descriptor);
  } else if (typeof arguments[0] === "string") {
    return new _Computed(arguments[0], arguments[1], arguments[2]);
  } else {
    return computedAnnotation(void 0, arguments[0], arguments[1], arguments[2]);
  }
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/EffectScheduler.mjs
var EffectScheduler = class {
  constructor(name, runEffect, options) {
    __publicField(this, "_isActivelyListening", false);
    /** @internal */
    __publicField(this, "lastTraversedEpoch", GLOBAL_START_EPOCH);
    __publicField(this, "lastReactedEpoch", GLOBAL_START_EPOCH);
    __publicField(this, "_scheduleCount", 0);
    /** @internal */
    __publicField(this, "parentEpochs", []);
    /** @internal */
    __publicField(this, "parents", []);
    __publicField(this, "_scheduleEffect");
    __publicField(this, "maybeExecute", () => {
      if (!this._isActivelyListening)
        return;
      this.execute();
    });
    this.name = name;
    this.runEffect = runEffect;
    this._scheduleEffect = options == null ? void 0 : options.scheduleEffect;
  }
  /**
   * Whether this scheduler is attached and actively listening to its parents.
   * @public
   */
  get isActivelyListening() {
    return this._isActivelyListening;
  }
  /**
   * The number of times this effect has been scheduled.
   * @public
   */
  get scheduleCount() {
    return this._scheduleCount;
  }
  /** @internal */
  maybeScheduleEffect() {
    if (!this._isActivelyListening)
      return;
    if (this.lastReactedEpoch === globalEpoch)
      return;
    if (this.parents.length && !haveParentsChanged(this)) {
      this.lastReactedEpoch = globalEpoch;
      return;
    }
    this.scheduleEffect();
  }
  /** @internal */
  scheduleEffect() {
    this._scheduleCount++;
    if (this._scheduleEffect) {
      this._scheduleEffect(this.maybeExecute);
    } else {
      this.execute();
    }
  }
  /**
   * Makes this scheduler become 'actively listening' to its parents.
   * If it has been executed before it will immediately become eligible to receive 'maybeScheduleEffect' calls.
   * If it has not executed before it will need to be manually executed once to become eligible for scheduling, i.e. by calling [[EffectScheduler.execute]].
   * @public
   */
  attach() {
    this._isActivelyListening = true;
    for (let i = 0, n = this.parents.length; i < n; i++) {
      attach(this.parents[i], this);
    }
  }
  /**
   * Makes this scheduler stop 'actively listening' to its parents.
   * It will no longer be eligible to receive 'maybeScheduleEffect' calls until [[EffectScheduler.attach]] is called again.
   */
  detach() {
    this._isActivelyListening = false;
    for (let i = 0, n = this.parents.length; i < n; i++) {
      detach(this.parents[i], this);
    }
  }
  /**
   * Executes the effect immediately and returns the result.
   * @returns The result of the effect.
   */
  execute() {
    try {
      startCapturingParents(this);
      const result = this.runEffect(this.lastReactedEpoch);
      this.lastReactedEpoch = globalEpoch;
      return result;
    } finally {
      stopCapturingParents();
    }
  }
};
function react(name, fn, options) {
  const scheduler = new EffectScheduler(name, fn, options);
  scheduler.attach();
  scheduler.scheduleEffect();
  return () => {
    scheduler.detach();
  };
}
function reactor(name, fn, options) {
  const scheduler = new EffectScheduler(name, fn, options);
  return {
    scheduler,
    start: (options2) => {
      const force = (options2 == null ? void 0 : options2.force) ?? false;
      scheduler.attach();
      if (force) {
        scheduler.scheduleEffect();
      } else {
        scheduler.maybeScheduleEffect();
      }
    },
    stop: () => {
      scheduler.detach();
    }
  };
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/isSignal.mjs
function isSignal(value) {
  return value instanceof _Atom || value instanceof _Computed;
}

// node_modules/.pnpm/signia@0.1.5/node_modules/signia/dist/esm/index.mjs
var src_default = api_exports;
export {
  EMPTY_ARRAY,
  EffectScheduler,
  RESET_VALUE,
  atom,
  computed,
  src_default as default,
  getComputedInstance,
  isAtom,
  isSignal,
  isUninitialized,
  react,
  reactor,
  transact,
  transaction,
  unsafe__withoutCapture,
  whyAmIRunning,
  withDiff
};
//# sourceMappingURL=signia.js.map
