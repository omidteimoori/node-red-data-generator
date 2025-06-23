// JavaScript: Node Logic (data-generator.js)
module.exports = function (RED) {
    function DataGeneratorNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        const type = config.datatype || 'sinusoidal';
        const frequency = parseInt(config.frequency) || 1000;
        const min = parseFloat(config.min) || 0;
        const max = parseFloat(config.max) || 100;
        let step = parseFloat(config.step);

        if (isNaN(step) || step < 0.001) step = 0.001;
        if (step > (max - min)) step = max - min;

        let amplitude = max - min;
        let current = min;
        let position = 0; // Normalized 0 to 1
        let lastType = type;
        let interval = null;

        function generateValue() {
            let value;

            if (lastType !== config.datatype) {
                position = 0;
                current = min;
                lastType = config.datatype;
            }

            switch (config.datatype) {
                case 'sinusoidal':
                    value = ((Math.sin(position * 2 * Math.PI) + 1) / 2) * amplitude + min;
                    position += step / amplitude;
                    break;

                case 'random':
                    value = Math.random() * amplitude + min;
                    break;

                case 'rising':
                    value = current;
                    current += step;
                    if (current > max) current = min;
                    break;

                case 'falling':
                    value = current;
                    current -= step;
                    if (current < min) current = max;
                    break;

                case 'square':
                    value = position < 0.5 ? min : max;
                    position += step / amplitude;
                    break;

                case 'triangle':
                    value = 2 * amplitude * (position < 0.5 ? position : 1 - position) + min;
                    position += step / amplitude;
                    break;

                case 'exponential':
                    value = min + (Math.pow(2, 10 * position) - 1) / (Math.pow(2, 10) - 1) * amplitude;
                    position += step / amplitude;
                    break;

                case 'sine+noise':
                    value = ((Math.sin(position * 2 * Math.PI) + 1) / 2) * amplitude + min + (Math.random() - 0.5) * (step / 2);
                    position += step / amplitude;
                    break;

                case 'stepchange':
                    const block = Math.floor(position * 5);
                    value = min + (block / 4) * amplitude;
                    position += step / amplitude;
                    break;

                default:
                    value = min;
                    break;
            }

            if (position > 1) position -= 1;

            node.send({
                payload: parseFloat(value.toFixed(6)),
                topic: config.datatype
            });
        }

        interval = setInterval(generateValue, frequency);

        node.on('close', function () {
            if (interval) clearInterval(interval);
        });
    }

    RED.nodes.registerType('data-generator', DataGeneratorNode);
};