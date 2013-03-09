Players = new Meteor.Collection("players");
if (Meteor.isClient) {
    Meteor.startup(function () {
        $(function(){
            $(document).on("mouseup", function (){
                clearTimeout(pointsTimer);
            });
        });
        // code to run on client at startup
    });

    var pointsTimer, pointsPlayer, timerStart, addTimer;

    var playerScoreAdd = function () {
        addTimer++;
        Players.update({_id: pointsPlayer._id}, {$set: {"score": pointsPlayer.score + 1}});
        pointsTimer = setTimeout(playerScoreAdd, timerStart / addTimer);
    };
    var playerScoreSubtract = function () {
        addTimer++;
        Players.update({_id: pointsPlayer._id}, {$set: {"score": pointsPlayer.score - 1}});
        pointsTimer = setTimeout(playerScoreSubtract, timerStart / addTimer);
    };
    Template.players.player = function () {
        return Players.find();
    };
    Template.players.events = {
        "mousedown .playerScoreSubtract": function (event, template) {
            addTimer = 1;
            pointsPlayer = this;
            timerStart = 1000;
            playerScoreSubtract();
        },
        "mousedown .playerScoreAdd": function (event, template) {
            addTimer = 1;
            pointsPlayer = this;
            timerStart = 1000;
            playerScoreAdd();
        }
    };
}
if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
