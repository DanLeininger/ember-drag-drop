import Ember from 'ember';
import Droppable from 'ember-drag-drop/mixins/droppable';

export default Ember.Component.extend(Droppable, {
  classNameBindings: ['overrideClass'],
  overrideClass: 'draggable-object-target',
  isOver: false,

  handlePayload: function(payload, event) {
    var obj = this.get('coordinator').getObject(payload,{target: this});
    this.sendAction('action',obj,{target: this}, event);
  },

  handleDrop: function(event) {
    var dataTransfer = event.dataTransfer;
    var payload = dataTransfer.getData("Text");
    this.handlePayload(payload, event);
  },

  acceptDrop: function(event) {
    this.handleDrop(event);
    //Firefox is navigating to a url on drop sometimes, this prevents that from happening
    event.preventDefault();
  },
  handleDragOver: function() {
    if (!this.get('isOver')) {
      //only send once per hover event
      this.set('isOver', true);
      this.sendAction('dragOverAction');
    }
  },
  handleDragOut: function() {
    this.set('isOver', false);
    this.sendAction('dragOutAction');
  },

  click(e) {
    let onClick = this.get('onClick');
    if (onClick) {
      onClick(e.originalEvent);
    }
  },

  actions: {
    acceptForDrop: function() {
      var hashId = this.get('coordinator.clickedId');
      this.handlePayload(hashId);
    }
  }
});
