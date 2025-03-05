/* exported config */
/**
 * JUG Sponsor Slides
 *
 * @copyright 2014 und 2024 Java User Group Switzerland (jug.ch)
 */

// Those are the general configuration settings for the JUG sponsor slides
// Please do all your changes in here unless you're completely sure what you are doing!
// SVGs work best for the sponsor logos
// IMPORTANT: Do NOT remove any config options!
var config = {
    // Content of the headline on the first slide
    // Supported tags: <h1> <h2> <h3> <p> <i> <b>
    // Set it to false to hide it completely
    // headline: false,
    headline: '<h2><b>A big thanks to our Supporting Members</b></h2>',

    // Slide display duration
    // Time each slide is displayed in ms.
    // Make sure that all animations fit in the duration
    introDuration: 2000,
    jugLogoDuration: 3000,

    // Over all slides, each logo of the sponsors will be highlighted
    // The following variables determine the times of these animations
    // Duration: How long the highlight animation lasts
    // Delay: The waiting time before the animation is being played

    platinumDuration: 4000,
    platinumDelay: 2000,

    goldDuration: 3000,
    goldDelay: 3500,

    silverDuration: 2000,
    silverDelay: 2250,

    // The platinum sponsor image, relative to the 'images' folder
    platinumSponsor: 'platinum/mimacom.png',

    // List of gold sponsor images, relative to the 'images' folder
    // Update primarySponsorDuration if the number of sponsors is changed (4 Sponsors: 13000)
    goldSponsors: [
        'gold/bbv.svg',
        'gold/ergon.svg',
        'gold/netcetera.png',
        'gold/orange_business.png',
        'gold/zuehlke.png'
    ],

    // List of silver sponsor images, relative to the 'images' folder
    silverSponsors: [
        'silver/42talents.svg',
        'silver/abacus.svg',
        'silver/adcubum.svg',
        'silver/adesso2.png',
        'silver/adnovum.svg',
        'silver/astina.png',
        'silver/bison.svg',
        'silver/btc.png',
        'silver/css.png',
        'silver/deimos.png',
        'silver/elca2.png',
        'silver/emineo.png',
        'silver/erni.png',
        'silver/eviden.png',
        'silver/fincons.png',
        'silver/hexagon.png',
        'silver/innoq.svg',
        'silver/inventage.png',
        'silver/mp_technology2.png',
        'silver/prodyna.png',
        'silver/puzzle.svg',
        'silver/redhat.png',
        'silver/solveva.png',
        'silver/t_systems.png',
        'silver/ti8m.png',
        'silver/worldline.png',
        'silver/zkb.png'
    ]
};
