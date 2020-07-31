// curl & ffmpeg are needed
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const spawn = require('child_process').spawn

const l = console.log

l(process.argv)
let coords = process.argv[3] + ',' + process.argv[2]
let audioFile = process.argv[4]

async function main() {
  const mapboxToken = 'pk.eyJ1IjoiY2hpZWZ0bCIsImEiOiJjajF3OGQzMGcwMDB0MndwbnA5ZjZzaDlnIn0.AoOGBOmwr_JEAN5Wz6dJ6g'
  
  try {
  
    let mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ffaf00(${coords})/${coords},16/500x500?access_token=${mapboxToken}`
    let imageCommand = `curl "${mapboxUrl}" > mapbox.png`
    l({imageCommand})
    var { stdout, stderr } = await exec(imageCommand)
    l({ stdout, stderr })
  
    let imageFile = 'mapbox.png'

    // ffmpeg -i image.jpg -i audio.mp3 -acodec libvo_aacenc -vcodec libx264 final.flv
    let ffmpegCommand = `ffmpeg -loop 1 -i ${imageFile} -i ${audioFile} -shortest -y out.mp4`
    l({ffmpegCommand})
    var { stdout, stderr } = await exec(ffmpegCommand)
  
  } catch(e) {
    l({e})
  }
	
  /*let ffmpeg = spawn("ffmpeg",
   `-loop 1 -i ${imageFile} -i ${audioFile} -shortest out.mp4 -y`.split(" "),
    { shell: true })

  ffmpeg.on('error', (error) => {
    console.log("ffmpeg error: " + error)
  })

  ffmpeg.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  ffmpeg.on('exit', (code, signal) => {
    console.log("ffmpeg shutdown: code " + code + ", signal " + signal)
  })*/
}

main()