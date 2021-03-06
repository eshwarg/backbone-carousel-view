var CarouselView = Backbone.View.extend({
	el: '#carousel',
	initialize: function() {
		this.currentIndex = this.options.currentIndex;
		this.itemsToScroll = this.options.itemsToScroll;
		this.pxToScroll = this.options.pxToScroll;
		this.elementsToShow = this.options.elementsToShow;
		this.totalElements = this.options.totalElements;
		this.elementsToUse = this.totalElements - this.elementsToShow;
		this.pages = Math.ceil(this.totalElements/this.elementsToShow);
		console.log(this.elementsToUse, this.pages);
		this.render();
	},
	events: {
		'click button': 'scroll',
		'click a' : 'scrollToPage'
	},
	scroll: function(e) {

		var buttonIndex = $(e.currentTarget).index();

		if(buttonIndex === 0) {
			if(this.elementsRemainingLeft <= this.itemsToScroll) {
				this.currentIndex -= this.elementsRemainingLeft;
			} else {
				this.currentIndex -= this.itemsToScroll;
			}
		}

		if(buttonIndex === 1) {
			if(this.elementsRemainingRight <= this.itemsToScroll) {
				this.currentIndex += this.elementsRemainingRight;
			} else {
				this.currentIndex += this.itemsToScroll;
			}
		}

		console.log(buttonIndex, this.currentIndex, this.currentIndex * this.pxToScroll);

		this.animate();
	},
	scrollToPage : function(e) {
		e.preventDefault();
		this.currentIndex = $(e.currentTarget).data('index') * this.elementsToShow;
		this.animate();
	},
	calculateRemainingElements: function() {
		this.elementsRemainingRight = this.elementsToUse - this.currentIndex;
		this.elementsRemainingLeft = this.elementsToUse - this.elementsRemainingRight;
		console.log("REMAINING RIGHT:", this.elementsRemainingRight);
		console.log("REMAINING LEFT:", this.elementsRemainingLeft);
		console.log("currentIndex", this.currentIndex);
	},
	animate: function() {
		this.calculateRemainingElements();

		if(this.elementsRemainingRight < 0) {
			console.log("CORRECTION");
			this.currentIndex = this.currentIndex + this.elementsRemainingRight;
			this.calculateRemainingElements();
		}


		$('#carouselScroller').stop().animate({
			left: -(this.currentIndex * this.pxToScroll)
		}, 250);



	},
	template: $('#carouselWrapperlayout').html(),
	render: function() {
		this.$el.html(this.template);
		this.$el.find('#carouselScroller').append($('#imageList').html());
		this.renderPages();
		this.animate();
		return this;
	},
	renderPages : function() {
		for(var i=0;i<this.pages;i++) {
			this.$el.append('<a href="" data-index="'+i+'">page'+i+'</a>');
		}
	}
});