/* global impress, config */
/**
 * JUG Sponsor Slides
 *
 * @copyright 2014 Java User Group Switzerland (jug.ch)
 */

/**
 * Minimum viable DOM-READY!
 * @param callback
 */
function onDomReady(callback) {
    'use strict';
    if (/p/.test(document.readyState)) {
        callback();
    }
    else {
        setTimeout(function() {
            onDomReady(callback);
        }, 9);
    }
}

onDomReady(function() {
    'use strict';

    /**
     * Helper methods for generating the logo markup
     * @type {{logo: Function, primarySponsors: Function, silverSponsors: Function}}
     */
    var markupCreator = {
    
        /**
         * Return markup for a logo
         * @param cssClass {string} Class(es) to add to the wrapper
         * @param imageUrl {string} URL of the image
         * @param [wrapperStyle] {string} Optional CSS styles to add to the image div
         * @returns {string}
         */
        logo: function(cssClass, imageUrl, wrapperStyle) {
            return '<div class="' + cssClass + '" style="' + wrapperStyle + '">' +
                '<div class="logo" style="background-image:url(images/' + imageUrl + ');"></div>' +
                '</div>';
        },

        /**
         * Generates and returns the markup for the platinum and gold sponsors
         * @returns {string}
         */
        primarySponsors: function() {
            // Set up platinum and gold sponsors
            var markup;
            
            // PLATINUM
            markup = markupCreator.logo('platinum platinumRow', config.platinumSponsor);

            // GOLD
            // Calculate the size that the gold sponsors should have
            var goldCount = config.goldSponsors.length;
            // Calculating the width of a gold sponsor logo
            var goldWidth = (90 / goldCount).toPrecision(5);
            
            for (var i = 0; i < goldCount; i++) {
                markup += markupCreator.logo(
                    'gold goldRow',
                    config.goldSponsors[i],
                    'width: ' + goldWidth + '%; left: ' + (5 + (i * goldWidth)) + '%'
                );
            }

            return markup;
        },

        /**
         * Generates and returns the markup for the silver sponsors
         * @returns {string}
         */
        silverSponsors: function() {
        
            // Count the silver icons and split them into 4 rows
            // In the current case of 26 silver sponsors, it results in 3 rows of 7 and one row of 5
            var silverCount = config.silverSponsors.length;
            var rowCount = [Math.round(silverCount / 4)];
            rowCount.push([Math.round(silverCount / 4)]);
            rowCount.push([Math.round(silverCount / 4)]);
            rowCount.push(silverCount - rowCount[0] - rowCount[1] - rowCount[2]);

            // Calculate the width of the logos per width
            var rowWidth = [
                (90 / rowCount[0]).toPrecision(5),
                (90 / rowCount[1]).toPrecision(5),
                (90 / rowCount[2]).toPrecision(5),
                (90 / rowCount[3]).toPrecision(5)
            ];

            // Assemble the markup
            var silverIndex = 0;
            var markup = '';
            for (var row = 0; row < rowCount.length; row++) {
                for (var i = 0; i < rowCount[row]; i++) {
                    markup += markupCreator.logo(
                        'silver silverRow' + (row + 1),
                        config.silverSponsors[silverIndex],
                        'width: ' + rowWidth[row] + '%; left: ' + (5 + (i * rowWidth[row])) + '%'
                    );
                    silverIndex += 1;
                }
            }

            return markup;
        }
    };


    // Set up the first side: check if we should add a headline
    if (config.headline) {
        // Add the has-headline class
        document.getElementById('jug').classList.add('has-headline');

        // Set the headline
        document.getElementById('headline').innerHTML = config.headline;
    }

    // Set up platinum and gold sponsors
    document.getElementById('primary-sponsor-logos').innerHTML = markupCreator.primarySponsors();

    // Set up silver sponsors
    document.getElementById('silver-sponsor-logos').innerHTML = markupCreator.silverSponsors();

    // Show the slides
    document.getElementById('impress').setAttribute('style', 'display: block');


    /**
     * Handles all interaction with impress
     * @type {{}}
     */
    var slides = (function() {
        /**
         * Impress instance
         */
        var api = impress();
        api.init();

        /**
         * Timeout id for switching slides
         * @type {number}
         */
        var switchSlideTimeoutId = 0;

        /**
         * Helper method for animating the silver logos.
         * Adds and removes the 'animated' class from the element
         *
         * @param element {HTMLElement} The DOM element to add the class to
         * @param delay {number} Delay before adding the class
         * @param duration {number} Duration that the class will stay on the element
         */
        var setLogoAsAnimated = function(element, delay, duration) {
            setTimeout(function() {
                element.classList.add('animated');
                setTimeout(function() {
                    element.classList.remove('animated');
                }, duration);
            }, delay);
        };

        // Public functions
        return {
            /**
             * Handles the changes of the slides
             * @param slideId
             */
            handleStep: function stepHandler(slideId) {
                // Make sure there is no slide switching timeout anymore
                clearTimeout(switchSlideTimeoutId);
                switchSlideTimeoutId = 0;

                switch (slideId) {
                case 'intro':
                    // The intro is only showed in the beginning of the presentation and transitions to the first prism
                    switchSlideTimeoutId = setTimeout(api.next, config.introDuration);
                    break;
                case 'jug':
                    // Face one holds the JUG logo and optional text
                    switchSlideTimeoutId = setTimeout(api.next, config.jugLogoDuration);
                    break;
                case 'primary-sponsors':
                    // The second face is about platinum and gold sponsors

                    // Animate platinum sponsor
                    var platinumSponsor = document.getElementsByClassName('platinum');
                    setLogoAsAnimated(platinumSponsor[0], config.platinumDelay, config.platinumDuration);
                    
                    // Identify gold row
                    var goldRow = document.getElementsByClassName('goldRow');
                    // Add animation class to gold elements
                    var platinumDelay = config.platinumDelay + config.platinumDuration + 1000;
                    for (var i = 0; i < goldRow.length; i++) {
                        setLogoAsAnimated(goldRow[i], platinumDelay + (config.goldDelay * i), config.goldDuration);
                    }
                    
                    // We switch the slide after all animations have happened (platin 7000, all gold and one extra goldDuration for the end)
                    var durationOfSlide = platinumDelay + (goldRow.length * config.goldDelay) + config.goldDuration;
                    console.log(durationOfSlide);
                    switchSlideTimeoutId = setTimeout(api.next, durationOfSlide);
                    break;

                case 'silver-sponsors':
                    // The last face holds all silver sponsors and will jump to face one when finished

                    // Queue up all the silver animations
                    var rowElements = [
                        document.getElementsByClassName('silverRow1'),
                        document.getElementsByClassName('silverRow2'),
                        document.getElementsByClassName('silverRow3'),
                        document.getElementsByClassName('silverRow4')
                    ];

                    var silverIndex = 0;
                    for (var row = 0; row < rowElements.length; row++) {
                        for (var i = 0; i < rowElements[row].length; i++) {
                            setLogoAsAnimated(rowElements[row][i], config.silverDelay + (config.silverDelay * silverIndex), config.silverDuration);
                            silverIndex += 1;
                        }
                    }

                    // We use goto to skip the intro and jump directly to the first slide
                    var delayToNextSlide = (config.silverDelay * config.silverSponsors.length) + 2 * config.silverDelay;
                    switchSlideTimeoutId = setTimeout(function() {
                        api.goto('jug');
                    }, delayToNextSlide);
                    break;
                }
            }
        };
    })();

    // Listen to the impress step change
    document.addEventListener('impress:stepenter', function(e) {
        slides.handleStep(e.target.getAttribute('id'));
    });
});
