var NowTime = null;
export default function (list) {
  NowTime = new Date().getTime();
  let newList = [];
  list.forEach(item => {
    let startTime = item.starttime * 1000;
    let EndTime = item.endtime * 1000;
    if (startTime > NowTime && EndTime > NowTime) {//未开始
      item.type = 0;
      item.time = count(startTime);
      newList.push(item)
    } else if(startTime < NowTime && EndTime > NowTime){//已开始
      item.type = 1;
      item.time = count(EndTime)
      newList.push(item)
    }
  });
  return newList;
}

function count(time) {
  let t = time - NowTime;
  let d = Math.floor(t / 1000 / 60 / 60 / 24);
  let h = Math.floor((t / 1000 / 60 / 60) % 24);
  let m = Math.floor((t / 1000 / 60) % 60);
  let s = Math.floor((t / 1000) % 60);
  let html = d + " 天" + h + " 时" + m + " 分" + s + " 秒";
  return html;
}
