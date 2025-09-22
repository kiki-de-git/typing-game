//准备工作
const quotes = ["Actions speak louder than words.",
  "Better late than never.",
  "Knowledge is power.",
  "Time is money.",
  "Practice makes perfect.",
  "Where there's a will, there's a way.",
  "No pain, no gain."
]
let words = [];                       //获得名言里面每个单词
let wordIndex = 0;                //现在输入的单词的索引
let startTime = 0;         //记录目前的时间
//获得主页元素
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");




//按钮点击事件
document.getElementById("start").addEventListener("click", function ()
//随机生成一个名言
{
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  console.log("随机到的句子:", quote);

  words = quote.split(' ');
  //目前单词索引变为0        
  wordIndex = 0;
  //先把每一个单词用<span>包住
  const spanWords = words.map((word) => {
    return `<span>${word} </span>`
  });
  //把上面的名句换为<span>构成的
  //因为innerHtml只能接受字符串属性
  quoteElement.innerHTML = spanWords.join('');
  //高光点亮第一个单词
  quoteElement.childNodes[0].className = "highlight";
  console.log("第一个单词：", quoteElement.childNodes[0]);
  //输入框内容清空,并且输入框自动获得光标（聚集到输入框）
  typedValueElement.value = '';
  typedValueElement.focus();
  //提示语清空
  messageElement.innerHTML = '';
  //记录开始时间
  startTime = new Date().getTime();
  console.log("开始时间:", startTime);
})

//注意，修改使其呈现在页面上，不要修改数组要修改DOM元素
//输入框实时检查
typedValueElement.addEventListener("input", (e) => {
  const currentWord = words[wordIndex];   //需要输入的单词
  //这里只是把字符串给复制过来，改变这个值并不会改变输入框内容
  const typedValue = typedValueElement.value; //用户输入的

  //开始检查
  if (typedValue === currentWord && wordIndex === words.length - 1) {  //全部打完
    const elapsedTime = Date.now() - startTime;
    //毫秒变秒
    messageElement.innerHTML = `恭喜你，你花费了${elapsedTime / 1000}秒`;

  } //每个单词打完
  else if (typedValue.trim() === currentWord && typedValue.endsWith(' ')) {
    //输入框置空
    typedValueElement.value = '';
    wordIndex++;
    //移除高光，重置高光
    //不是DOM元素，不能这样直接修改class Name
    /*for (const word of spanWords) {
      word.className = ' ';
    }*/
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    quoteElement.childNodes[wordIndex].className = "highlight";
  }       //如果现在输入的不对
  else if (!currentWord.startsWith(typedValue)) {
    typedValueElement.className = "error";
  }
  else {
    typedValueElement.className = '';
  }


})