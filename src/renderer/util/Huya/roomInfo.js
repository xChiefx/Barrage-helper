import axios from 'axios';

function parseRoomInfo(html) {
  // 解析html, 截取出所需要的js脚本里的内容
  // 使用 Function 运行
  const valScript = new RegExp('<script\\sdata-fixed="true">([^<]*?全局js[\\s\\S]*?)</script>', 'g').exec(html)[1];
  const valNameList = valScript.match(/[_a-zA-Z0-9]+(?=\s?=)/g);
  const returnScript = `return {${valNameList.join(',')}};`;
  const f = new Function(valScript + returnScript);
  return f();
}

function getRoomInfo(rId) {
  return new Promise((resolve, reject) => {
    axios.get(`https://m.huya.com/${rId}`)
      .then((res) => {
        resolve(parseRoomInfo(res.data));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default getRoomInfo;
