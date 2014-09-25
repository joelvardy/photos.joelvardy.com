function Swipe(){}function Analytics(){}function Lightbox(){}function Page(){}function Grid(){}document.addEventListener("DOMContentLoaded",function(){window.photos={swipe:new Swipe,analytics:new Analytics,page:new Page,grid:new Grid,lightbox:new Lightbox},window.photos.grid.init(),window.photos.grid.resize(),window.addEventListener("resize",function(){window.photos.grid.resize(),window.photos.lightbox.repositionPhoto()}),window.photos.grid.resize(),window.photos.lightbox.init(20),""!==window.photos.page.getHash()&&(window.photos.lightbox.open(window.photos.page.getHash()),window.photos.analytics.event("Lightbox: open","Direct link")),document.onkeydown=function(a){switch(a.keyCode){case 27:window.photos.lightbox.close(),window.photos.analytics.event("Lightbox: close","Escape key");break;case 37:window.photos.lightbox.previous(),window.photos.analytics.event("Lightbox: previous photo","Left key");break;case 39:window.photos.lightbox.next(),window.photos.analytics.event("Lightbox: next photo","Right key")}},window.addEventListener("hashchange",function(){return""===window.photos.page.getHash()&&window.photos.lightbox.isOpen()?(window.photos.lightbox.close(),void window.photos.analytics.event("Lightbox: close","Hash change")):(window.photos.lightbox.open(window.photos.page.getHash()),void window.photos.analytics.event("Lightbox: change photo","Hash change"))}),window.photos.analytics.externalLinks()}),Swipe.prototype={init:function(a,b){this.active=!1,this.startPosition={x:0,y:0},this.endPosition={x:0,y:0},this.leftCallback=a,this.rightCallback=b;var c=this;document.addEventListener("touchstart",function(a){if(1===a.targetTouches.length){var b=a.targetTouches[0];c.active=!0,c.startPosition.X=b.pageX,c.startPosition.Y=b.pageY}},!1),document.addEventListener("touchmove",function(a){if(1===a.targetTouches.length){var b=a.targetTouches[0];c.endPosition.X=b.pageX,c.endPosition.Y=b.pageY}},!1),document.addEventListener("touchend",function(){c.active=!1;var a=c.startPosition.X-c.endPosition.X>0?"left":"right",b=Math.abs(c.startPosition.X-c.endPosition.X),d=Math.abs(c.startPosition.Y-c.endPosition.Y);if(b>50&&b/4>d)switch(a){case"left":c.leftCallback();break;case"right":c.rightCallback()}},!1)}},Analytics.prototype={init:function(){},event:function(a,b){ga("send","event","userActions",a,b)},externalLinks:function(){ga(function(){Array.prototype.forEach.call(document.querySelectorAll("p.information a"),function(a){a.addEventListener("click",function(a){a.preventDefault();var b,c=this;switch(a.target.classList.toString()){case"joelvardy":b="Joel Vardy";break;case"github":b="GitHub repo"}ga("send","event","userActions","External link",b,{hitCallback:function(){document.location.href=c.href}})})})})}},Lightbox.prototype={init:function(a){this.settings={overlayClass:"overlay",overlayPhotoClass:"overlay-photo",elements:window.photos.grid.gridElement().querySelectorAll("div.photo"),spacing:a},this.elements={body:document.querySelector("body")},this._setupElements(),this._registerClickListners(),this._registerSwipeListners()},_setupElements:function(){var a=this;if(this._isOpen=!1,this._pagePosition=0,!document.querySelector(this.settings.overlayClass)){var b=document.createElement("div");b.classList.add(this.settings.overlayClass),this.elements.overlay=document.body.appendChild(b)}if(this.elements.overlay.addEventListener("click",function(){a._hide(),window.photos.analytics.event("Lightbox: close","Clicked overlay")}),!document.querySelector(this.settings.overlayPhotoClass)){var c=document.createElement("div");c.classList.add(this.settings.overlayPhotoClass),this.elements.overlayPhoto=document.body.appendChild(c)}this.elements.overlayPhoto.addEventListener("click",function(){a.next(),window.photos.analytics.event("Lightbox: next photo","Clicked photo in lightbox")})},_show:function(){this._pagePosition=window.pageYOffset,this.elements.overlay.style.display="block",this.elements.overlayPhoto.style.display="block",this.elements.body.style.overflow="hidden",this._isOpen=!0},_hide:function(){var a=this;this.elements.body.style.overflow="auto",this.elements.overlayPhoto.style.display="none",this.elements.overlay.style.display="none",window.scroll(0,a._pagePosition),a._isOpen=!1,window.photos.page.clearHash(),window.photos.page.resetTitle()},repositionPhoto:function(){var a,b,c=(window.innerWidth-2*this.settings.spacing)/(window.innerHeight-2*this.settings.spacing),d=parseFloat(this.settings.elements[this.currentIndex].dataset.aspectRatio);c>d?(b=window.innerHeight-2*this.settings.spacing,a=Math.floor(b*d)):(a=window.innerWidth-2*this.settings.spacing,b=Math.floor(a/d)),this.elements.overlayPhoto.style.height=b+"px",this.elements.overlayPhoto.style.width=a+"px",this.elements.overlayPhoto.style.top=Math.floor((window.innerHeight-b)/2)+"px",this.elements.overlayPhoto.style.left=Math.floor((window.innerWidth-a)/2)+"px"},_updatePhoto:function(a){var b=this;b.repositionPhoto(),window.photos.page.getHash()!==a.dataset.hash&&window.photos.page.setHash(a.dataset.hash),window.photos.page.setTitle(a.getAttribute("title"));var c=document.createElement("img");if(c.src=a.dataset.small,c.complete||c.width+c.height>0){this.elements.overlayPhoto.style.backgroundImage=a.style.backgroundImage;var d=new Image;d.onload=function(){b.elements.overlayPhoto.style.backgroundImage="url("+a.dataset.large+")"},d.src=a.dataset.large}else this.elements.overlayPhoto.style.backgroundImage="url("+a.dataset.large+")"},_registerClickListners:function(){var a=this;Array.prototype.forEach.call(this.settings.elements,function(b,c){b.addEventListener("click",function(){a.currentIndex=c,a._updatePhoto(b),a._show(),window.photos.analytics.event("Lightbox: open","Clicked photo")})})},_registerSwipeListners:function(){var a=this;"ontouchstart"in document.documentElement&&window.photos.swipe.init(function(){a.isOpen()&&(a.next(),window.photos.analytics.event("Lightbox: next photo","Swipe"))},function(){a.isOpen()&&(a.previous(),window.photos.analytics.event("Lightbox: previous photo","Swipe"))})},isOpen:function(){return this._isOpen},open:function(a){var b=this,c=!1;Array.prototype.forEach.call(this.settings.elements,function(d,e){return d.dataset.hash===a?(c=!0,b.currentIndex=e,b._updatePhoto(d),void(b.isOpen()||b._show())):void(c||e!==b.settings.elements.length-1||window.photos.page.clearHash())})},close:function(){this._hide()},previous:function(){this.isOpen()&&("undefined"==typeof this.settings.elements[this.currentIndex-1]&&(this.currentIndex=this.settings.elements.length),this.currentIndex--,this._updatePhoto(this.settings.elements[this.currentIndex]))},next:function(){this.isOpen()&&("undefined"==typeof this.settings.elements[this.currentIndex+1]&&(this.currentIndex=-1),this.currentIndex++,this._updatePhoto(this.settings.elements[this.currentIndex]))}},Page.prototype={init:function(){},clearHash:function(){history.replaceState({},this._pageTitle,"/")},getHash:function(){return window.location.hash.substring(3)},setHash:function(a){history.pushState({},document.title,"#!/"+a)},resetTitle:function(){document.title=this._pageTitle},setTitle:function(a){this._pageTitle||(this._pageTitle=document.title),document.title=a}},Grid.prototype={init:function(){this.elements={grid:document.querySelector("div.grid")},this._setupElements()},_setupElements:function(){var a=this;Array.prototype.forEach.call(this.gridElement().querySelectorAll("img"),function(b){var c=document.createElement("div");c.classList.add("photo"),c.classList.add(b.classList.toString()),c.dataset.hash=b.dataset.hash,c.dataset.aspectRatio=b.dataset.aspectRatio,c.dataset.large=b.dataset.large,c.setAttribute("title",b.getAttribute("alt")),c.dataset.small=b.getAttribute("src"),c.style.backgroundImage="url("+c.dataset.small+")",a.gridElement().replaceChild(c,b)})},_photoSize:function(a){return Math.floor((this.gridWidth-(a+1)*this.gridSpacing)/a)},gridElement:function(){return this.elements.grid},resize:function(){var a=this;this.gridWidth=parseInt(window.getComputedStyle(this.elements.grid).width),this.gridSpacing=Math.floor(this.gridWidth/100*2.5),this.elements.grid.style.paddingTop=this.gridSpacing+"px",this.elements.grid.style.paddingLeft=this.gridSpacing+"px",Array.prototype.forEach.call(this.elements.grid.querySelectorAll("div.photo"),function(b){b.style.marginRight=a.gridSpacing+"px",b.style.marginBottom=a.gridSpacing+"px"});var b=4;this.gridWidth<800?b=2:this.gridWidth<1100&&(b=3);var c=1,d=0;Array.prototype.forEach.call(this.elements.grid.querySelectorAll("div.photo"),function(e){var f=!1;c>b&&(c=1,d>0&&(c=2)),d>0&&d--,e.classList.contains("wide")?b>c&&(e.style.height=a._photoSize(b)+"px",e.style.width=2*a._photoSize(b)+a.gridSpacing+"px",c+=2,d>0&&d--,f=!0):e.classList.contains("tall")&&1===c&&(e.style.height=2*a._photoSize(b)+a.gridSpacing+"px",e.style.width=a._photoSize(b)+"px",c++,d=2*(b-1),f=!0),f||(e.style.height=a._photoSize(b)+"px",e.style.width=a._photoSize(b)+"px",c++)})}};