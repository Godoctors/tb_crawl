let data = [];
let lists = document.querySelectorAll("#mainsrp-itemlist .items"); // ul  中间是要获取的元素列表
// 正常是循环取到的元素列表，然后取每一个中间的值，这里就当循环第一次，取第一个值。
let items = lists[0];
items = items.querySelectorAll("div.item");

items.forEach((item) => {
  
  //搜搜词
  kw = document.getElementByid("q").geAttribute("value")
  // 图片链接
  picLink = item.querySelector(".pic .img").getAttribute("data-src");
  // 详情页链接
  detailLink = item.querySelector(".title  a").getAttribute("href");
  // 商品id
  goodsID = item.querySelector(".shop a").getAttribute("data-nid");
  // 商品价格
  price = item.querySelector(".price").innerText;
  // 收货人数
  cnt = item.querySelector(".deal-cnt").innerText;
  // 商品标题
  goodsTitle = item.querySelector(".title").innerText;
  // 店铺名称
  shopName = item.querySelector(".shop").innerText;
  // 地区
  area = item.querySelector(".location").innerText;
  // 图标内容
  icons = [
    ...[
      ...item.querySelectorAll(
        ".ctx-box.J_MouseEneterLeave.J_IconMoreNew div.row"
      ),
    ]
      .slice(-1)[0]
      .querySelectorAll("ul li span"),
  ]
    .map((icon) => icon.title)
    .filter((it) => it)
    .join("\t");

  //将数据添加到data中
  data.push({
    kw:kw,
    goodsID: goodsID,
    price: price,
    cnt: cnt,
    goodsTitle: goodsTitle,
    shopName: shopName,
    area: area,
    icons: icons,
    picLink: picLink,
    detailLink: detailLink,
  });
});

// 定义一个修改元素样式的函数
function setStyle(dom, styles = {}) {
  Object.keys(styles).map((key) => {
    dom.style[key] = styles[key];
  });
  return dom;
}

// 设置表头
let header = {
  kw:"搜索词",
  goodsID: "商品id",
  price: "商品价格",
  cnt: "收货人数",
  goodsTitle: "商品标题",
  shopName: "店铺名称",
  area: "地区",
  icons: "图标内容",
  picLink: "图片链接",
  detailLink: "详情页链接",
};
data.unshift(header);
let csvString = "";

// 循环获取到所有数据后
data.map((item) => {
  Object.keys(header).map((key) => {
    let value = item[key];
    csvString += value + ",";
  });
  csvString += "\r\n";
});
csvString = "data:application/csv," + encodeURIComponent(csvString);
let btn = document.createElement("a");
btn.setAttribute("href", csvString);
btn.setAttribute("download", "data.csv");
// btn.style.display = "none"; // 隐藏的可下载链接
btn.innerText = "下载";
// 设置按钮的样式
btn = setStyle(btn, {
  position: "fixed",
  textAlign: "center",
  textDecoration: "none",
  fontSize: "large",
  top: "10px",
  left: "10px",
  width: "48px",
  height: "30px",
  zIndex: "9999999999", // 让他在左上角显示
  backgroundColor: "orange", // 注意的是，样式名不能有下划线，要合并在一起改为首字母大写列如：  background-color  =>  backgroundColor
});

document.body.appendChild(btn);
btn.click();
// 然后移除
// document.body.removeChild(btn);
