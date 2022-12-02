import { postImageToEmail, postImage } from "../ApiCalls";

export const downloadImage = (e, finalCanvas) => {
    let link = e.currentTarget;
    link.setAttribute('download', 'test.png');
    let image = finalCanvas.current.toDataURL('image/png');
    link.setAttribute('href', image);
}

export function sendPhotoToEmail(finalCanvas) {
    var imgData = finalCanvas?.current.toDataURL('image/png');
    postImageToEmail(imgData);
}
export function saveToCollection(finalCanvas) {
    var imgData = finalCanvas?.current.toDataURL('image/png');
    postImage(imgData);
}

export function mergeCanvas(targetCanvas, ...args) {
    const ctx = targetCanvas.getContext('2d');
    args.forEach(canvas => {
        ctx.drawImage(canvas, 0, 0, targetCanvas.width, targetCanvas.height);
    });
}