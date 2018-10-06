import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class FileDropper extends Component {
  constructor() {
    super()
    this.state = { files: [] }
  }

  onDrop(files) {
    this.setState({
      files
    })
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <ul>
          {
            this.state.files.map(f => {
              const reader = new FileReader()
              reader.onload = () => {
                const fileAsBinaryString = reader.result
                console.log(fileAsBinaryString)
                // do whatever you want with the file content
              };
              reader.onabort = () => console.log('file reading was aborted')
              reader.onerror = () => console.log('file reading has failed')

              reader.readAsBinaryString(f)
            })
          }
        </ul>
      </section>
    )
  }
}

export default FileDropper
