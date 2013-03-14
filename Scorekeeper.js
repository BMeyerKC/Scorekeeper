Players = new Meteor.Collection("players");
if (Meteor.isClient) {
    Meteor.startup(function () {

        $(function () {
            $(document).on("mouseup", function () {
                clearTimeout(pointsTimer);
                setTimeout(playerSort, 1000);
            });
        });
        // code to run on client at startup
    });

    var pointsTimer, pointsPlayer, timerStart, addTimer;

    var playerScoreAdd = function () {
        addTimer++;
        Players.update({_id: pointsPlayer._id}, {$set: {"scoreWillBe": pointsPlayer.scoreWillBe + 1}});
        pointsTimer = setTimeout(playerScoreAdd, timerStart / addTimer);
    };
    var playerScoreSubtract = function () {
        addTimer++;
        Players.update({_id: pointsPlayer._id}, {$set: {"scoreWillBe": pointsPlayer.scoreWillBe - 1}});
        pointsTimer = setTimeout(playerScoreSubtract, timerStart / addTimer);
    };

    var playerSort = function () {
        Players.find().forEach(function (player) {
            //Fixes unknown scores
            if (player.scoreWillBe == undefined) {
                Players.update({_id: player._id}, {$set: {"scoreWillBe": player.score}});

            }
            if (player.scoreWillBe == undefined || player.scoreWillBe != player.score) {
                Players.update({_id: player._id}, {$set: {"score": player.scoreWillBe}});
            }
        });
    };

//Template players
    Template.players.preserve([".player"]);
    Template.players.player = function () {
        return Players.find({}, {sort: { score: -1}});
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
