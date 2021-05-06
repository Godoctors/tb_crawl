// -*- coding:utf-8 -*-
// 定义数据列表
let data = [];
// 获取数据列表项
// 注意有些店铺布局时item4line1，需要将此处的5改成4，后面的切片改成slice(0,-8)
let lists = document.querySelectorAll(".J_TItems .item5line1 .item"); 
// 顶以循环列表，放进data数据列表中
// 将nodelist 降为数组   ...拆分
let items = [...lists].slice(0,-10);
// 进行遍历循环
items.forEach((item) => {
  
  // 获取详情页链接
  detailLink = item.querySelector("dd .J_TGoldData").getAttribute("href");
  // 获取商品名称
  goodsname = item.querySelector(".detail a").innerText;
  // 商品价格
  price = item.querySelector(".c-price").innerText;
  try{
  //获取销量
  sales = item.querySelector(".detail .sale-area span").innerText;
  //获取评价
  rates = item.querySelector(".rates .title  span").innerText.split("评价:")[1];
  }catch(error){
    console.log("没有销量评价！");
    rates == ""; 
    sales == 0;
  }
  // 商品id
  goodsID = detailLink.split('id=')[1].split('&')[0]
  //将数据添加到data中
  data.push({
    goodsID: goodsID,
    goodsname:goodsname,
    price:price,
    sales:sales,
    rates:rates,
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
  goodsID: "商品id",
  goodsname:"商品名称",
  price:"售价",
  sales:"销量",
  rates:"评价",
  detailLink: "详情页链接",
};
// unshift 设置项数据，这里就是设置表头
data.unshift(header);

// 定义存储文件字符串
let csvString = "";

// 循环获取到所有数据后
data.map((item) => {
  Object.keys(header).map((key) => {
    let value = item[key];
    csvString += value + ",";
  });
  // 循环换一行数据进行换行
  csvString += "\r\n";
});
// 定义下载链接
csvString = "data:application/csv," + encodeURIComponent(csvString);
// 定义下载按钮
let btn = document.createElement("a");
// 设置属性值 链接、下载
btn.setAttribute("href", csvString);
btn.setAttribute("download", "data.csv");
// btn.style.display = "none"; // 隐藏的可下载链接
// 设置按钮文本信息字样
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
// 设置子属性
document.body.appendChild(btn);

// 点击下载
btn.click();
// 然后移除
// document.body.removeChild(btn);
