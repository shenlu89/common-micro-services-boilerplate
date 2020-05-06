const sendJSONresponse = async(ctx, status, content) => {
    ctx.status = status || 500
    ctx.body = content
}

export default sendJSONresponse