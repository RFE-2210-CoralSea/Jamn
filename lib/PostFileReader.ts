export default function readFile(f: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.addEventListener('loadend', (e) => {
      resolve(e?.target?.result as ArrayBuffer)})
    reader.addEventListener('error', reject)
    reader.readAsArrayBuffer(f)
  })
}
