import WaveSurfer from "wavesurfer.js"

const duration = document.querySelector('#duration')
const curr = document.querySelector('#current')
const playPause = document.querySelector('#playPause')

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#cdedff',
  progressColor: '#1AAFFF',
  height: 48
})

const timeCalc = (val:number) => {
  const min = Math.floor(val/60)
  let sec = Math.floor(val - min * 60)

  if (sec < 10) {
    let seconds = '0' + sec.toString()
    return min + ':' + seconds
  }
  return min + ':' + sec
}

wavesurfer.load('/slide frank ocean.mp4')

playPause?.addEventListener('click', (e) => {
  wavesurfer.playPause()
})

wavesurfer.on('ready', () => {
  if (duration) {
    duration.textContent = timeCalc(wavesurfer.getDuration())
  }
})

wavesurfer.on('play', () => {
  playPause?.classList.remove('fi-rr-play')
  playPause?.classList.add('fi-rr-pause')
})

wavesurfer.on('pause', () => {
  playPause?.classList.add('fi-rr-play')
  playPause?.classList.remove('fi-rr-pause')
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