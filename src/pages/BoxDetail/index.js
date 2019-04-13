import React, { Component } from 'react';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api.js'
import logo from '../../assets/img/logo.svg';
import { MdInsertDriveFile} from 'react-icons/md';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';
import './styles.css'

export default class BoxDetail extends Component {
    state = { box: {} }

    async componentDidMount() {
       this.subscribeToNewFiles();
       const box = this.props.match.params.id;
       const response = await api.get(`boxes/${box}`);

       this.setState({box: response.data });
    
    }

    subscribeToNewFiles = () => {
        const box = this.props.match.params.id;
        const io = socket('https://semana-rockseat-backend.herokuapp.com');
        io.emit('connectRoom', box);
        io.on('file', data =>{
            this.setState({box: { ...this.state.box, files: [data, ...this.state.box.files]}})
        });
    }

    handleUpload = (files) => {
        files.forEach(file => {
            const data = new FormData();
            const box = this.props.match.params.id;
            data.append('file', file);
            api.post(`boxes/${box}/files`, data);
        });
    };
  render() {
    return (
        <div id="box-container">
            <header>
                <img src={logo} alt="logo da rockeseat"/>
                <h1>{this.state.box.title}</h1>
            </header>

            <Dropzone onDropAccepted={this.handleUpload}>
                {({getRootProps, getInputProps}) => (
                    <div className="upload" {...getRootProps()}>
                        <input {...getInputProps()}></input>
                        <p>Arraste arquivos ou clique aqui</p>
                    </div>
                )}
            </Dropzone>

            <ul>
                {
                    this.state.box.files && this.state.box.files.map(file =>(
                        <li key={file._id}>
                            <a href={file.url} className="fileInfo" target="_blank">
                                <MdInsertDriveFile size={24} color="#a5cfff" />
                                <strong>{file.title}</strong>
                            
                            </a>

                            <span>Há {""}{distanceInWords(file.createdAt, new Date(), {locale:pt})}</span>
                        </li>
                    ))
                }
                
            </ul>

        </div>
    );
  }
}
