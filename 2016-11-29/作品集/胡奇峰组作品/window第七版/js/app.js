/* default dom id (particles-js) */
//particlesJS();

/* config dom id */
//particlesJS('dom-id');

/* config dom id (optional) + config particles params */
particlesJS('particles-js', {
  particles: {
  	//节点的颜色
    color: '#fff',
    //节点的形状
    shape: 'circle', // "circle", "edge" or "triangle"
    //节点透明度
    opacity: 0.8,
    //节点大小
    size: 7,
    //节点大小是否随机
    size_random: true,
    //节点的数量（不要超过200个，太卡）
    nb: 140,
    line_linked: {
    	//是否连接线
      enable_auto: true,
      //线的数量
      distance: 150,
      //线的颜色
      color: '#fff',
      //线的透明度
      opacity: 0.9,
      //线的宽度
      width: 1,
      condensed_mode: {
      	//不清楚
        enable: true,
        /*
         * 每个连接点的密集度？？？？
         */
        rotateX: 400,
        rotateY: 400
      }
    },
    anim: {
    	//是否运动
      enable: true,
      //运动速度
      speed: 5
    }
  },
  interactivity: {
  	//鼠标移入是不是有效果
    enable: false,
    mouse: {
    	//连接线的密集度
      distance: 100
    },
    //不清楚
    detect_on: 'canvas', // "canvas" or "window"
    mode: 'grab',
    line_linked: {
      opacity: 1
    },
    events: {
      onclick: {
      	/*
      	 * 是不是有点击事件
      	 */
        enable: false,
        /*
         * push添加节点
         * remove 删除节点
         */
        mode: 'push', // "push" or "remove"
        //添加数量
        nb: 5
      }
    }
  },
  //支持手机端
  /* Retina Display Support */
  retina_detect: false
});