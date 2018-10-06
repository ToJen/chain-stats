import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const FileDropperStyle = {
    width: "800px",
    margin: "30px auto",
}

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
          <Dropzone onDrop={this.onDrop.bind(this)} style={FileDropperStyle}>
            <p>Drop a smart contract (.sol) here.</p>
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
                /*
                const req = request.post('/upload');
    acceptedFiles.forEach(file => {
        req.attach(file.name, file);
    });
    req.end(callback);
    */
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
