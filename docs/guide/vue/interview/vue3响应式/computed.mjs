import { effect, track, trigger } from "./effect.mjs";

function computed(getter) {
  let value;
  let dirty = true;
  const runner = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, "value");
    }
  });
  const obj = {
    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }
      track(obj, "value");
      return value;
    }
  }
  return obj;
}

export { computed };