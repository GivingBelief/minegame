window.onload = function () {
  // 消除鼠标左键,滑轮键,右键在浏览器的默认事件
  document.oncontextmenu = function () {
    return false
  }

  // 获取宽度
  var divW = document.getElementsByClassName('box')[0].offsetWidth
  // 获取高度
  var divH = document.getElementsByClassName('box')[0].offsetHeight
  var tdW = 40;
  var tdH = 30;
  // 地雷的数组
  var leiarray = []
  // 蒙版的数组
  var bluespan = []
  // 表格的数组
  var bluediv = []
  // 获取table标签
  var table = document.getElementsByTagName('table')[0]

  var rightclick = 50

  // 把蒙版平分等分的块数
  var meng = document.getElementsByClassName('meng')[0]
  for (var i = 0; i < divH / tdH; i++) {
    for (var j = 0; j < divW / tdW; j++) {
      var span = document.createElement('span');
      span.className = 'arme'
      meng.appendChild(span)
    }
  }

  //获取蓝色span标签
  var meng = document.getElementsByClassName('meng')[0]
  var spans = meng.getElementsByTagName('span')


  // 设置表格
  for (var i = 0; i < divH / tdH; i++) {
    var tr = document.createElement('tr');
    table.appendChild(tr)
    for (var j = 0; j < divW / tdW; j++) {
      var td = document.createElement('td');
      bluediv.push(td)
      tr.appendChild(td)
    }
  }

  // 获取全部的td标签
  var td = document.getElementsByTagName('td');
  for (var i = 0; i < td.length; i++) {
    var tds = td[i]
    // 设置点击事件
    tds.onclick = function (e) {
      console.log(this);
      console.log(e.pageX);
      console.log(e.pageY);
    }
  }

  // 将雷的图片索引添加进去
  var leinum = []
  // 添加雷的图片
  for (var i = 0; i < 50; i++) {
    // 随机取随机数(随即数的范围 = 随即数 × td的个数)
    var num = parseInt(Math.random() * td.length)
    leinum.push(num)
    // 获取随机数对应的td索引值
    var tdselected = td[num]
    var spanselected = spans[num]
    // 添加样式
    tdselected.className = 'active'
    spanselected.className += ' love'
    // spanselected.className += ' lpp'
    // console.log(tdselected, spanselected);
    leiarray.push(tdselected)

  }


  // 遍历点击事件,点击改变当前的span的class(点击前景色消失)
  // 并且弹出你已经踩到地雷
  var meng = document.getElementsByClassName('meng')[0]
  var spans = meng.getElementsByTagName('span')
  var open = document.getElementsByClassName('open')[0]
  // console.log(spans);
  for (var i = 0; i < spans.length; i++) {
    var selectedspan = spans[i]
    // 将遍历出来的span标签放入一个数组中
    bluespan.push(selectedspan)

    selectedspan.onmousedown = function (e) {
      // e.which 为监听用户点击鼠标的某个按键
      // e.which==1 点击鼠标左键
      // e.which==2 点击鼠标中间滑轮键
      // e.which==3 点击鼠标右键
      if (e.which == 1) {
        // alert('你点击了鼠标左键')
        if (this.className == 'arme love') {
          setTimeout(function () {
            alert('你已经踩到地雷了')
            // 添加classname,弹出游戏结束界面
            open.className += ' fixedopen'
          }, 100)

        }
        this.className = 'spanarme'
        // 获取点击元素的索引
        // 一个low的九宫格代码
        var clickspan = bluespan.indexOf(this);
        var lefttopnum = clickspan - 21
        var topnum = clickspan - 20
        var righttopnum = clickspan - 19
        var leftnum = clickspan - 1
        var leftbottomnum = clickspan + 19
        var bottomnumnum = clickspan + 20
        var rightbottomnum = clickspan + 21
        var rightnum = clickspan + 1

        // console.log(clickspan);
        console.log(leinum);

        // 设置九宫格空数组进行存储
        var ninenum = []
        ninenum.push(clickspan, lefttopnum, topnum, righttopnum, leftnum, leftbottomnum, bottomnumnum, rightbottomnum, rightnum)
        console.log(ninenum);

        var number = 0
        var ninenumber = 9
        // 遍历九宫格数据添加地雷显示样式
        // 如果不存在雷就添加样式,存在雷就不添加样式
        for (var i = 0; i < ninenum.length; i++) {
          // spans[ninenum[i]].className = 'spanarme'
          // console.log(ninenum[i]);
          if (leinum.indexOf(ninenum[i]) == -1) {
            // console.log(1);
            number = ++number
            // spans[ninenum[i]].className = 'spanarme'
          }

        }
        var minenum = ninenumber - number
        this.innerHTML = minenum
        var R = parseInt(Math.random() * 255)
        var G = parseInt(Math.random() * 255)
        var B = parseInt(Math.random() * 255)
        console.log(R, G, B);
        this.style.color = 'rgba(' + R + ',' + G + ',' + B + ')'
        // }

      }
      else if (e.which == 2) {
        alert('你点击了鼠标滑轮键')
      } else if (e.which == 3) {
        // alert('你点击了鼠标右键')
        // console.log(this);
        var img = document.createElement('img')
        img.src = '../images/qi.png'
        this.appendChild(img)
        var qinum = --rightclick
        if (qinum <= 0) {
          qinum = 0
          alert('你的小旗已经用完,你等着被炸死吧')

        }
        // 获取小旗的剩余个数
        document.getElementsByClassName("leispan")[0].innerHTML = qinum
      }
    }
  }


  document.getElementsByClassName("leispan")[0].innerHTML = rightclick
  // 设置右边的定时器
  var hour = document.getElementsByClassName('hour')[0]
  var min = document.getElementsByClassName('min')[0]
  var secs = document.getElementsByClassName('secs')[0]
  var hourtimer = 0
  var mintimer = 3
  var secstimer = 59

  var timer = null
  hourtimer = '0' + hourtimer;
  mintimer = '0' + mintimer;

  secs.innerHTML = secstimer
  min.innerHTML = mintimer
  hour.innerHTML = hourtimer

  var kais = document.getElementsByClassName('kais')[0]
  kais.onclick = function () {
    timer = setInterval(function () {
      secstimer--
      if (secstimer < 10) {
        secstimer = '0' + secstimer;
        if (secstimer * 1 <= 0) {
          secstimer = 30
          mintimer--
          if (mintimer < 10) {
            mintimer = '0' + mintimer;
            if (mintimer * 1 <= 0) {
              secstimer = '0' + 0
              clearInterval(timer)
            }
          }
        }
      }
      secs.innerHTML = secstimer
      min.innerHTML = mintimer
      hour.innerHTML = hourtimer
    }, 1000)
  }
}

