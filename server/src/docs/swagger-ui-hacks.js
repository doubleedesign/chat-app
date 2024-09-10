document.addEventListener('DOMContentLoaded', function() {
    const swaggerUI = document.getElementById('swagger-ui');

    waitForElementToExist('#swagger-ui').then(() => {
        waitForElementToExist('.model-box-control', 100).then(() => {
            swaggerUI.dispatchEvent(new Event('load'));
        });
    });

    swaggerUI.addEventListener('load', function() {

        // Fix heading level of Schemas, and also change it to Types
        const schemaHeading = document.querySelector('.models > h4');
        schemaHeading.outerHTML = "<h3>" + schemaHeading.innerHTML.replace('Schemas', 'Types') + "</h3>"

        // Hack the schema display
        const schemaButtons = document.querySelectorAll('.model-box-control');
        schemaButtons.forEach(button => {
            // Enum button disappears on click; instead of hackily just putting that one back, consistently replace them all with headings
            const container = button.closest('.model-container');
            let heading = document.createElement('h4');
            heading.innerHTML = container.dataset.name
            container.prepend(heading);

            // Default expand depth in config does not open models by default, it only controls what's open inside them,
            // so let us hack them to initially open by simulating a click
            button.click();
            // They are then hidden using CSS because .remove() isn't working, it's a hack but it'll do for now
        });

        // Add some classes/attributes to things for targeting with CSS
        waitForElementToExist('.prop').then(() => {
            const props = document.querySelectorAll('.prop');
            props.forEach(prop => {
                prop.dataset.name = prop.querySelector('.prop-name')?.innerHTML;
            })
        });
    });
});


// Adapted from https://codepen.io/boosmoke/pen/abbMZzb
const waitForElementToExist = (selector, limit) => {
    return new Promise((resolve, reject) => {
        let count = 0;
        (function waitForFoo() {
            const element = document.querySelector(selector);
            if (element) return resolve(element);
            if (limit && count > limit) return false;
            count += 1;
            setTimeout(waitForFoo, 50);
        })();
    });
};
