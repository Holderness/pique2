var surv = surv || {};

surv.Survey = Backbone.View.extend({
	el: '#questionnaire',
	surveyTemplate: _.template($('#question-template').html()),
	startTemplate: _.template($('#start-template').html()),
	initialize: function() {
		userAnswers = new surv.Questions();
		this.question();
	},
	events: {
		'click .surv-question' : 'rotate'
	},
  rotate: function(e) {
    e.preventDefault();
		var answer = $(e.currentTarget).find('figcaption').data('id');
    var id = $(e.currentTarget).data('id');
    var userInput = {question: id, selection: answer};
		var model = new surv.Question(userInput);
		userAnswers.push(model);
		console.log(userAnswers);
    var next = id += 1;
    var question = this.collection.get(next);
    this.question(question);
  },
	question: function(model) {
		var model = model || this.collection.get(1);
		var id = model.get('id');
		$divId = $('#question-' + id);
		if (id === 6) {
			$divId.append(this.startTemplate(model.toJSON()));	
		} else {
			$divId.append(this.surveyTemplate(model.toJSON()));
			setTimeout(function() {
				this.pan(id);
			}.bind(this), 500);
		}
		return false;
	},
	pan: function(id) {
	  $('html, body').animate({
	    scrollTop: $("#question-" + id).offset().top
	  }, 1000);
	  this.svg();
	},
	svg: function() {
			(function() {    
  
  function init() {
    var speed = 250,
        easing = mina.easeinout;
  
    [].slice.call (document.querySelectorAll('#grid > a')).forEach(function(el) {
        var s = Snap(el.querySelector('svg') ), path = s.select('path'),
       pathConfig = {
           from : path.attr('d'),
           to : el.getAttribute('data-path-hover')
       };
  
        el.addEventListener('mouseenter', function() {
       path.animate({'path' : pathConfig.to}, speed, easing);
        });
  
        el.addEventListener('mouseleave', function() {
       path.animate({'path' : pathConfig.from}, speed, easing);
        });
    });
  }
  
  init();
  
})();
  
	},
});