import WaveSurfer from "wavesurfer.js"

export const WrapperFunc = (posterName:any, playButton:any, duration2:any, current:any) => {
  const duration = document.getElementById(duration2.current)
  const curr = document.getElementById(current.current)
  const playPause = document.getElementById(playButton.current)

  const wavesurfer = WaveSurfer.create({
    container: `#${posterName.current}`,
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

  wavesurfer.load(duration2.current)

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
}