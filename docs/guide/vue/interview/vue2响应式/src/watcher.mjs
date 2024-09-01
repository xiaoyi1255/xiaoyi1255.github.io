import { parsePath } from "./utils.mjs";
import Dep from "./dep.mjs";
let uid = 0;

export default class Watcher {
  constructor(vm, expOrFn, cb, options = {}) {
    this.vm = vm;
    this.cb = cb;
    this.options = options;
    this.id = ++uid;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.getter = this.getterFn(expOrFn);
    this.value = options?.lasy ? undefined : this.get();
    this.active = true
  }

  getterFn(expOrFn) {
    if (typeof this.expOrFn === 'function') {
      return this.expOrFn;
    } else {
      return parsePath(expOrFn);
    }
  }

  get() {
    Dep.target = this;
    let value
    try {
      console.log(' watcher get>>>', this.getter)
      value = this.getter.call(this.vm, this.vm);
    } finally {
      Dep.target = null;
    }
    return value;
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      let dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else {
      this.run();
    }
  }
  run() {
    if (this.active) {
      const value = this.get();
      if (value !== this.value || typeof value === 'object' || this.deep) {
        const oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
      }
      
    }
  }
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}