import "@google/model-viewer";

const RhicModel = () => {
    return (
        <model-viewer style={{ width: "75%", height: "75%" }} src="rhic.glb" camera-controls autoplay />
    );
}
export default RhicModel;
