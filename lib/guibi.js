function merge(left, right){
  var result = [];
  while (left.length > 0 && right.length > 0){
    if (left[0] < right[0]){
      result.push(left.shift());//把最小的最先取出，放到结果集中
    } else {
      result.push(right.shift());
    }
  } 
 // console.log(result)
  return result.concat(left).concat(right);//剩下的就是合并，这样就排好序了
}

function mergeSort(array){
  if (array.length == 1) {
    return array;
  }
  var middle = Math.floor(array.length / 2),//求出中点
  left = array.slice(0, middle),//分割数组
  right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));//递归合并与排序
}

window.onload=function(){
var arr=[1,6,2]

var arr1=mergeSort(arr)
}