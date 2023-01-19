import WaveSurfer from "wavesurfer.js"

export const WrapperFunc = (songName:any, playButton:any, duration2:any, current:any, songData:any) => {
  const duration = document.getElementById(duration2.current)
  const curr = document.getElementById(current.current)
  const playPause = document.getElementById(playButton.current)

  const timeCalc = (val:number) => {
    const min = Math.floor(val/60)
    let sec = Math.floor(val - min * 60)

    if (sec < 10) {
      let seconds = '0' + sec.toString()
      return min + ':' + seconds
    }
    return min + ':' + sec
  }

  const audioData = songData.current;
  const audioDataView = new DataView(new ArrayBuffer(audioData.length));
  for (let i = 0; i < audioData.length; i++) {
    audioDataView.setUint8(i, audioData[i]);
  }
  const audioBuffer = audioDataView.buffer;
  const audioContext = new (window.AudioContext || window.AudioContext)();

  audioContext.decodeAudioData(audioBuffer, (buffer) => {
    // create an instance of WaveSurfer
    const wavesurfer = WaveSurfer.create({
      container: '#a' + songName.current.replace(/\s/g,''),
      waveColor: '#cdedff',
      progressColor: '#1AAFFF',
      height: 48,
      audioBuffer: buffer
    });
    // load the audio buffer
    wavesurfer.loadDecodedBuffer(buffer);

    playPause?.addEventListener('click', () => {
      wavesurfer.playPause()
    })

    wavesurfer.on('ready', () => {
      if (duration) {
        duration.textContent = timeCalc(wavesurfer.getDuration())
      }
    })

    wavesurfer.on('audioprocess', () => {
      if (curr) {
        curr.textContent = timeCalc(wavesurfer.getCurrentTime())
      }
    })
    wavesurfer.on('seek', () => {
      if (curr) {
        curr.textContent = timeCalc(wavesurfer.getCurrentTime())
      }
    })
  });
}