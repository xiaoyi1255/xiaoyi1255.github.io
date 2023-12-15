type JSONValue = null | boolean | number | string | JSONValue[] | { [key: string]: JSONValue };

declare global { 
    interface Function {
      callPolyfill(context: Record<string, JSONValue>, ...args: JSONValue[]): JSONValue;
	}
}

Function.prototype.callPolyfill = function(context, ...args): JSONValue {
	const key = Symbol('tempKey')
	context.__proto__[key] = this
	const result = context[key]?.(...args)
	delete context[key]
  return result
}

/**
 * function increment() { this.count++; return this.count; }
 * increment.callPolyfill({count: 1}); // 2
 */