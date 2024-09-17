# Client Tasks

# Client Components

## AudioRecorder
This component is responsible for managing the recording of audio files.

### Props
None

### Requirements
- Has a Start Recording Button
  - On Clicking start, begins recording audio from microphone
- Has a Stop Recording Button
  - On Click, stops recording the audio and renders the AudioPlayer component with the audio file
- Has a Pause Recording Button
- Shows in real-time the content as a waveform using Wavesurfer when recording
- Once the recording has been complete:
  - The waveform should be shown for the audio
  - A Save Audio Buttion should be presented
    - on Click, the audio should be save to the Vue State
    - capture the entire session’s audio file and send it separately to your back-end service to be saved to the database. (currently just stub out this functionality)
  - A Delete Audio Button should be presented
    - on Click, the audio should be deleted from the local state
- While Recording
  - The recording framework needs to be able to have an event that is fired every 5 seconds to capture the audio byte stream in chunks while recording, rather than at the end of the recording session.
  -  Each chunk of byte audio stream data needs to be sent to a Node js back-end(rest or graphql api) as .wav format. (back-end javascript framework of your choice) (currently simply create a function which handles the submitting of it with correct error handling, backend functionality will be implemented late)


## AudioPlayer
This component will receive an audio file and play its contents, it should be loosely coupled using props

### Props
- file: Should be an object that contains all of the data to be played
- ShowWaveform: Optional boolean which when true, will show a wavesurfer waveform of the audio

### Requirements
- Should be a rounded component
- Should have a play button
  - on click, should resume the audio whereever it is
- Should have a pause button
  - Pause button should appear where play button is once the file is playing
  - on click, it should pause the audio where it is, and the play button should appear
- Should have a stop button
  - on click: Current play resets to beginning
- Should have a waveform optionally rendered depending on props



