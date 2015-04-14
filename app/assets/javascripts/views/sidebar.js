var Sidebar = Backbone.View.extend({
	el: '#sidebar-items',
	sidebarPreviewTpl: _.template($('#sidebar-message-template').html()),
	initialize: function() {
		this.render();
	},
	render: function(conversation) {
		var messages = this.model.attributes.messages;
		var x = messages.length - 1;
		var lastMessage = messages[x];
		console.log(lastMessage);
		this.$el.append(this.sidebarPreviewTpl(lastMessage));
		return this;
	},
});