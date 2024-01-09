/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const newList = new ListNode(0);
  let cur = newList
  let p1 = l1
  let p2 = l2
  let carry = 0
  while (p1 || p2) {
    let val1 = p1 ? p1.val : 0
    let val2 = p2 ? p2.val : 0
    let sum = val1 + val2 + carry
    carry = Math.floor(sum / 10)
    cur.next = new ListNode(sum % 10)
    if (p1) p1 = p1.next
    if (p2) p2 = p2.next
    cur = cur.next
  }
  if (carry) {
    cur.next = new ListNode(carry)
  }
  return newList.next
};

console.log(addTwoNumbers([2, 4, 3], [5, 6, 4]));