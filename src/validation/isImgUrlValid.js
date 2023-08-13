const isImage = (url) => {
    return url.match(/^https?:\/\/.+\/.+$/);
}

export default isImage;