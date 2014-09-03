if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("subReady", false);

  var subDep = new Deps.Dependency();

  Deps.autorun(function () {
    subDep.depend();

    Session.set("subReady", false);
    Meteor.subscribe("fooSub", "bar", function() { Session.set("subReady", true )});
  });

  Template.hello.helpers({
    ready: function () {
      return Session.get("subReady");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      subDep.changed();
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("fooSub", function(arg) {
    return [];
  });
}
