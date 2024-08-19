define([], function() {
  const message = "Hello from Module 1";
  return {
    message,
    obj: {
      name: "Module 1",
      version: "1.0.0",
    }
  };
})