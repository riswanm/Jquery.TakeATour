;
(function ($) {
   // var publish = fx.mediator.publish;
  //  var events = touch.events;
    //var router = fx.router;
   // var extend = fx.extend;
    var accessedSteps = [], settings = {}

  
   // touch.tour = extend(touch.tour, tour);

    $.fn.takeATour = function (options) {
        settings = $.extend({
            firstStep : 1

        }, options
        );
  
        accessedSteps.push(settings.firstStep);
        return generateStep(settings.firstStep - 1);
    }

    function generateStep(stepindex) {


        var step = settings.steps[stepindex],
         imageFolderPath = settings.imageFolderPath,
         imgurl = imageFolderPath + '/' + (parseInt(step.imageID)) + '.png',
         screenHtml = '<div class="newboxes tat-div1"> <div class="tat-div-inner"> <a class="exit" href="#"></a> <div class="tat-div-inner1"> ' +
            '<figure class="screenImg" style="background-image: url(' + imgurl + ');"></figure>  ',
            stepCallBack = settings.stepCallBack,
            exitCallBack =  settings.exitCallBack;

        if (step.fingures) {
            for (var i = 0; i < step.fingures.length; i++) {
                var fig = step.fingures[i],
                    pos = fig.linkpos || [0, 0, 0, 0],
                    linkStep = fig.linkStep;
                screenHtml = screenHtml + ' <figure class="fingureImg" style="left:' + fig.left + '%;top:' + fig.top + '%">' + //background-color:grey;
                    '</figure><a href="#" id="link_' + stepindex + '_' + linkStep + '" class="fingerLink" style="width:' + pos[0] + '%;height:' + pos[1] + '%;top:' + pos[2] + '%;left:' + pos[3] + '%">&nbsp;</a> ';

            }
        } else {
            screenHtml = screenHtml + '<div class="tat-end">The End!</div>'
        }

        if (stepindex != 0) {
            screenHtml = screenHtml + ' <a href="#" class="tat-previous"></a>'
        }

        + '</div> </div> </div>'


        $('#take-a-tour').html(screenHtml);
        $('.newboxes').hide();
        if (step.fingures) {
            for (var i = 0; i < step.fingures.length; i++) {
                var fig = step.fingures[i],
                    linkStep = fig.linkStep;
                $('#take-a-tour').off('tap', '#link_' + stepindex + '_' + linkStep);
                $('#take-a-tour').on('tap', '#link_' + stepindex + '_' + linkStep, function (steps) {
                    return function (e) {
                        if (!e.handled) {

                            var nextScreen = parseInt(this.id.split('_')[2]);
                            steps.push(nextScreen);
                            generateStep(nextScreen - 1);



                        }
                        if (e.preventDefault) {
                            e.preventDefault();
                        }
                        if (e.stopPropagation) {
                            e.stopPropagation();
                        }
                        return false;
                    }
                }(accessedSteps));
            }
        }
        else {
            $('#take-a-tour').on('tap', '.tat-end', function () {
                if (exitCallBack) {
                    exitCallBack();
                }
            });
        }
        $('#take-a-tour').off('tap', '.exit');
        $('#take-a-tour').on('tap', '.exit', function () {
            if (exitCallBack) {
                exitCallBack();
            }
        });

        $('#take-a-tour').off('tap', '.tat-previous');
        $('#take-a-tour').on('tap', '.tat-previous', function (e) {
            if (!e.handled) {
                var prevStep = accessedSteps.pop();

                generateStep(accessedSteps[accessedSteps.length - 1] - 1);
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            return false;

        });
        $('.newboxes').show(400);

        if (stepCallBack) {
            stepCallBack(step.stepName);
        }
        //publish(events.TAKE_A_TOUR_STEPIN, {
        //    step: step.stepName
        //});
    }

}(jQuery));
