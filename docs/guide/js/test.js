/**
 * 观察者模式：
 * 一个主题可以被多个观察者订阅 =》 一对多
 * 主题更新：所有订阅改主题的都对更新
 */

// 主题
class Subject {
  constructor() {
    this.observers = [];
  }

  register(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  remove(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(info) {
    this.observers.forEach(observer => observer.update(info));
  }
}

// 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }

  update(info) {
    console.log(`${this.name} 收到主题更新消息~${info}`);
  }
}
// 实例主题对象
const sub = new Subject();
// 实例订阅者
const ob1 = new Observer('ob1');
const ob2 = new Observer('ob2');

// 订阅主题
sub.register(ob1);
sub.register(ob2);
sub.register(ob2);

// 主题发布广播事件
sub.notify('语雀有福利');

// 取消订阅主题
sub.remove(ob2);

// 主题发布广播事件
sub.notify('免费领取六个月会员');
