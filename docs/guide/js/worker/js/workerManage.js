/**
 * 创建 webworker serrviceworker sharedworker
 */

class WorkerManage {
  worker = null;
  type = '';

  constructor({type = 'webWorker', url = ''} = {}) {
    if (!type || !url) {
      throw new Error('type or url is required');
    };
    this.type = type;
    this.init(type, url);
  }
  postMessage(data) {
    if (this.worker) {
      console.log('postMessage',tyepe,data);
      this.worker.postMessage(data);
    }
  }
  onMessage(callback) {
    this.worker.onmessage = callback;
  }

  async init(type, url) {
    switch (type) {
      case 'webWorker':
        this.worker = new Worker('worker.js' ||url);
        break;
      case 'sharedWorker':
        this.worker = new ServiceWorker(url);
        break;
      case 'serviceWorker':
        if ('serviceWorker' in navigator) {
          try {
            this.worker = await navigator.serviceWorker.register(url);
            console.log('Service Worker registered with scope:', this.worker.scope);
          } catch (error) {
            console.error('Service Worker registration failed:', error);
          }
        }
        break;
      default:
        break;

      }
      console.log(' worker init', this.worker);
  }
}

export {
  WorkerManage
}