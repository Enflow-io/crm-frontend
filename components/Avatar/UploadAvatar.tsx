import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import {
    Button, Form, notification
} from 'antd';
import Api from "../../services/Api";
import * as Lockr from "lockr";

class UploadAvatar extends React.Component {
    constructor(props: any) {
        super(props);
        const userData = Lockr.get('user')
        this.state = {
            image: props.image ?? '/pic/default_avatar.jpg',
            allowZoomOut: false,
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            rotate: 0,
            borderRadius: 50,
            preview: null,
            width: 330,
            height: 330,
            imageChanged: false,
            //@ts-ignore
            canEdit: props?.canEdit ?? (userData?.role === 'admin' || userData?.email === 'a.sonyushkin@rnbconsulting.ru' || userData?.email === 'm.ponomareva@rnbconsulting.ru'),
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNewImage = (e: any) => {
        this.setState({ image: e.target.files[0] });
        this.setState({ imageChanged: true });
    };
    handleScale = (e: any) => {
        const scale = parseFloat(e.target.value);
        this.setState({ scale });
    };
    handlePositionChange = (position: any) => {
        this.setState({ position });
    };
    //@ts-ignore
    setEditorRef = (editor: any) => (this.editor = editor);

    async handleSubmit(e: any) {
        // @ts-ignore
        if (this.editor && this.state.imageChanged) {
            // @ts-ignore
            const img = this.editor.getImageScaledToCanvas().toDataURL();
            this.setState({ imageChanged: false });
            // @ts-ignore
            const res = await Api.updateAvatar(img, this.props.user.id);
            if (res.status === 201) {
                notification.success({
                    message: 'Аватар обновлен',
                    description: 'Аватар обновлен',
                    duration: 3,
                })
            } else {
                notification.error({
                    message: 'Ошибка загрузки аватара',
                    description: 'Ошибка загрузки аватара',
                    duration: 3,
                })
            }
            console.log(res)
        }
    }
    render() {
        return (
            <div>
                <div>
                    <ReactAvatarEditor
                        ref={this.setEditorRef}
                        // @ts-ignore
                        scale={parseFloat(this.state.scale)}
                        // @ts-ignore
                        width={this.state.width}
                        // @ts-ignore
                        height={this.state.height}
                        // @ts-ignore
                        position={this.state.position}
                        onPositionChange={this.handlePositionChange}
                        // @ts-ignore
                        rotate={parseFloat(this.state.rotate)}
                        // @ts-ignore
                        borderRadius={this.state.width / (100 / this.state.borderRadius)}
                        // @ts-ignore
                        image={this.state.image}
                        //color={[255, 255, 255, 0.6]}
                        className="editor-canvas"
                        backgroundColor={'red'}
                    />
                </div>
                <br />
                {// @ts-ignore
                    this.state?.canEdit && <label>
                    <input
                        name="upload-img-input"
                        type="file"
                        onChange={this.handleNewImage}
                    />
                    {/*<h3>Upload Photo</h3>*/}
                </label>}
                {// @ts-ignore
                    this.state?.canEdit &&  <br />}
                {// @ts-ignore
                    this.state?.canEdit &&  <h3>Zoom</h3>}
                {// @ts-ignore
                    this.state?.canEdit && <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={// @ts-ignore
                        this.state.allowZoomOut ? "0.1" : "1"}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />}
                {// @ts-ignore
                     this.state?.canEdit && <div>
                    <Button onClick={this.handleSubmit} disabled={// @ts-ignore
                         !this.state.imageChanged} type="primary" htmlType="submit">
                        Загрузить аватар
                    </Button>
                </div>}
            </div>
        )}}
export default UploadAvatar;