(function() {
	var Menubar = function() {
		this.el = document.querySelector('#sidebar-navi-id ul');
		this.state = 'allclosed';
		this.el.addEventListener('click',function(e) {
			e.stopPropagation();
		});
		var self = this;
		this.currentOpendMenucontent = null;
		this.menuList = document.querySelectorAll('#sidebar-navi-id ul > li');
		for(var i=0;i<this.menuList.length;i++) {
			this.menuList[i].addEventListener('click',function(e) {
				var menuContentEl = document.getElementById(e.currentTarget.id + '-content');
				console.log(menuContentEl);
				if(self.state === 'allclosed') {
					console.log('打开' + menuContentEl.id);
					menuContentEl.style.top = '0';
					menuContentEl.style.right = '-35px';
					menuContentEl.className = 'nav-content';
					menuContentEl.classList.add('menuContent-move-left');
					self.state = 'hasOpened';
					self.currentOpendMenucontent = menuContentEl;
				}else {
					console.log('关闭' + self.currentOpendMenucontent.id);
					self.currentOpendMenucontent.className = 'nav-content';
					self.currentOpendMenucontent.style.top = '0';
					self.currentOpendMenucontent.style.right = '-175px';
					self.currentOpendMenucontent.classList.add('menuContent-move-right');
					console.log('打开' + menuContentEl.id);
					menuContentEl.className = 'nav-content';
					menuContentEl.style.top = '300px';
					menuContentEl.style.right = '0px';
					menuContentEl.classList.add('menuContent-move-up');
					self.state = 'hasOpened';
					self.currentOpendMenucontent = menuContentEl;
				}
			});
		}
		this.menuContentList = document.querySelectorAll('.nav-content > div.nav-con-close');
			for(i=0;i<this.menuContentList.length;i++) {//menuContentList.length前面忘了加this
				this.menuContentList[i].addEventListener('click',function(e) {
					var menuContent = e.currentTarget.parentNode;
					menuContent.className = 'nav-content';
					menuContent.style.top = '0';
					menuContent.style.right = '-35px';//style.right设置了大小，实现了动画效果
					menuContent.classList.add('menuContent-move-right');
					this.state = 'allclosed';
				});
			}
	};
	var Sidebar = function(eId,closebarId) {
		this.state = 'opened';
		this.el = document.getElementById(eId || 'sidebar-navi-id');
		this.closebarEl = document.getElementById(closebarId || 'closebar');
		var self = this;
		this.menubar = new Menubar();
		this.el.addEventListener('click',function(event) {
			if(event.target !== self.el) {
				self.triggerSwitch();
			}
		});
};
	Sidebar.prototype.close = function() {
		this.el.style.right = '0px';	// css动画样式基于元素的初始位置，关闭没有必要改变元素的起始位置
		this.el.className = 'sidebar-navi-right';
		this.closebarEl.style.right = '0px';
		this.closebarEl.className = 'close-bar-left';	
		this.state = 'closed';
	};
	Sidebar.prototype.open = function() {
		this.el.style.right = '-90px';
		this.el.className = 'sidebar-navi-left';
		this.closebarEl.style.right = '140px';  // css动画样式基于元素的初始位置，打开需要调整元素的起始位置
		this.closebarEl.className = 'close-bar-right';
		this.state = 'opened';
	};
	Sidebar.prototype.triggerSwitch = function() {
		if(this.state === 'opened') {
			this.close();
		}else {
			this.open();
		}
	};
	var sidebar = new Sidebar();

	
})();