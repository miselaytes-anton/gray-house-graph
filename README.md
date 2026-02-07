# "Gray house" character relationships visualization

This is vibe-coding experiment to create a character relationships visualization for "Gray house" book by Mariam Petrosyan.

## The relationship data

Used [Google AI Studio](https://aistudio.google.com) to generate JSON with charachter relationships based on the book text. The important part is to enable "structured output" option and provide the schema for the output. See `./prompt/input/schema.json`.

## The app

The app is a React app that visualizes the relationships between characters in the book. It uses the `react-force-graph-2d` library to create a force-directed graph based on the relationships data. It is completely vibe-coded and the code itself is therefore of no particular value, but it is worth checking the `./context` folder for the various instructions which were provided to the agent.

## Avatar images

Those are generated using [Nano Banana](https://nanobanana.ai).
