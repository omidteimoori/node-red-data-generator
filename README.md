# @omidteimoori/node-red-data-generator

A custom Node-RED node to simulate various data types such as **sinusoidal**, **random**, **rising**, **falling**, **square**, **triangle**, and **sawtooth** values. Ideal for testing dashboards, signal processing, OPC UA mockups, or edge device emulation.

## 📦 Features

- Outputs data automatically after deployment (no trigger required)
- Supports:
  - Sinusoidal wave
  - Random values
  - Rising ramp
  - Falling ramp
  - Square wave
  - Triangle wave
  - Sawtooth wave
- Customizable:
  - Frequency (ms)
  - Minimum and maximum values
  - Step size
- Sets `msg.payload` to the generated value and `msg.topic` to the selected data type

## 🛠 Installation

You can link it locally while developing:

```bash
cd ~/.node-red
npm install @omidteimoori/node-red-data-generator
```

## 🧪 Usage

1. Open the Node-RED editor
2. Drag the **Data Generator** node from the "function" category
3. Configure the following options:
   - Type: Select waveform (sinusoidal, square, etc.)
   - Frequency: Output rate in milliseconds
   - Min/Max: Value range
   - Step: Precision or ramp size


## 👨‍💻 Author

Developed by [Omid Teimoori](https://omidteimoori.com)  
MIT License

## 🔗 Related

- [Node-RED](https://nodered.org/)
- [Other Projects](https://omidteimoori.com/projects.html)