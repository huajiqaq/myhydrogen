const { createApp, ref, watchEffect } = Vue

const RELEASES_URL = "https://mydata.huajicloud.ml/hydrogen.html"

// 获取元素的绝对位置坐标（像对于页面左上角）
function getElementPagePositionY(element) {

  //计算y坐标
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += (current.offsetTop + current.clientTop);
    current = current.offsetParent;
  }
  //返回结果
  return actualTop
}
const appConfig = ref(null)
/*
fetch(RELEASES_URL)
  .then((response) => response.json())
  .catch(function (error) {
    console.warn(error)
  })
  .then((json) => (appConfig.value = json))
  .catch(function (error) {
    console.warn(error)
  })
*/

function show(){ 
	mdui.snackbar({ 
	 message: '请等待版本号信息加载完毕后 再点击', 
	});
}


fetch(RELEASES_URL)  
 .then(response => response.text())
 .then(data => {
   let re = /(?<firstProp>[a-z]+)=(?<val>[^,]+),(?<secondProp>[a-z]+)/g;
   let result = {};
   while((match = re.exec(data)) != null) {
     let val = match.groups.val;
     val = val.replace(/\r\n/g, '');  
     result[match.groups.firstProp] = val;
   }
   document.getElementById('download').href=result.updateurl
   appConfig.value = result; 
 }) 
 

var app = createApp({
  data: () => {
    return {
      pathname: window.location.pathname,
      name: 'Hydrogen',
      description: 'Hydrogen是基于androlua的一个轻量级第三方知乎App',
      menus: [
      /*
        {
          title: '首页',
          href: '/',
          target: '_self',
          type: 'menu'
        },
        {
          title: '插件下载',
          href: '/plugins.html',
          target: '_blank',
          type: 'menu'
        },
        {
          title: '使用文档',
          href: 'https://aidelua.github.io/AideLua/',
          target: '_self',
          type: 'menu'
        },
        {
          type: 'divider'
        },
        */
        {
          title: 'Gitee 仓库',
          href: 'https://gitee.com/huajicloud/hydrogen',
          target: '_blank',
          type: 'menu'
        },
        {
          title: 'Github 仓库',
          href: 'https://github.com/huajiqaq/hydrogen',
          target: '_blank',
          type: 'menu'
        }
      ],
      screenshot: [
        {
          title: '轻量级体积',
          summary: '软件体积小,目前仅5.6mb大小', 
          src: 'null'
        },
        {
          title: '支持保存内容', 
          summary: '支持官方App不支持的保存内容',
          src: 'null'
        },
        {
          title: '开源与可定制', 
          summary: '完全开源,代码开放,可以自由查看与定制',
          src: 'null'
        },
        {
          title: '开发者重视用户意见', 
          summary: '开发者十分重视用户的意见和反馈,积极改进产品',
          src: 'null'
        }
      ],
      developers: [
        {
          name: 'Eddie',
          summary: '网站开发',
          avatar: 'https://q1.qlogo.cn/headimg_dl?dst_uin=2140125724&spec=100'
        },
        {
          name: '0047ol',
          summary: '网站开发',
          avatar: 'https://q1.qlogo.cn/headimg_dl?dst_uin=2088343717&spec=100'
        }
      ],
      contact: [
        {
          title: 'Gitee',
          icon: 'email-outline',
          href: 'https://gitee.com/huaji110',
          tooltip: {
            content: '去Gitee联系我'
          }
        },
        {
          title: 'Github',
          icon: 'email-outline',
          href: 'https://github.com/huajiqaq',
          tooltip: {
            content: '去Github联系我'
          }
        }
      ],
      links: [
        {
          name: 'AIDE Pro',
          href: 'https://www.aidepro.top/'
        },
        {
          name: 'MDUI',
          href: 'https://www.mdui.org/'
        },
        {
          name: 'VuePress',
          href: 'https://vuepress.vuejs.org/zh/'
        }
      ],
      isTop: true,
    }
  },
  setup() {

    return {
      appConfig
    }
  },
  mounted() {
    this.isTop = getTopState(window)
    let infoSpaceY = getElementPagePositionY(document.getElementById('appInfoSpace'))
    window.addEventListener('scroll', () => this.isTop = window.scrollY <= infoSpaceY)
    mdui.mutation()
  },
  updated() {
    mdui.mutation()
  }
})

