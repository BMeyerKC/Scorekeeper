Players = new Meteor.Collection("players");
if( Meteor.isClient ) {
  Meteor.startup( function( ) {
    // code to run on client at startup
  } );
    var playerScoreAdd = function( player ) {
      console.log("playerScoredAdd");
      console.log( player );
      Players.update( {_id: player._id}, {$set: {"score": player.score +1}} );
    };
    Template.players.player = function( ) {
    return Players.find( );
  };
  Template.players.events = {
    "click .playerScoreSubtract": function( event, template ) {
      Players.update( {_id: this._id}, {$set: {"score": this.score -1}} );
    },
    "click .playerScoreAdd": function( event, template ) {
      //Players.update( {_id: this._id}, {$set: {"score": this.score +1}} );
    },
    "mousedown .playerScoreAdd": function( event, template ) {
      playerScoreAdd(this);
      //Players.update( {_id: this._id}, {$set: {"score": this.score +1}} );
    },
    "mouseup .playerScoreAdd": function( event, template ) {
      //clearTimeout( t );
    }
  };
}
if( Meteor.isServer ) {
  Meteor.startup( function( ) {
    // code to run on server at startup
  } );
}
