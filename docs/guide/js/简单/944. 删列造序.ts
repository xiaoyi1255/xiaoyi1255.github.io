function minDeletionSize(strs: string[]): number {
  let dels = 0
  const item = strs[0].length
    for (let i = 0; i <item; i++) {
      for (let j = 1; j < strs.length; j++) {
        if (strs[j]?.[i] < strs[j-1]?.[i]) {
          dels++
          break 
        }
      }
    }
    return dels
};

// console.log(minDeletionSize(["caa","bba","anu"]))
// console.log(minDeletionSize(["cba","daf","ghi"]))
console.log(minDeletionSize(["rrjk","furt","guzm"]))
// console.log(minDeletionSize(["aihdtcw","hqlcusg","ptxfoxq"]))