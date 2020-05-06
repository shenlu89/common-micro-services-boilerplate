// Error logging format
const formatError = ({ method, ip, url, request, response }, err, costTime) => {
    ip = ip.replace(/^.*:/, '')
    const date = new Date().toLocaleString()
    return { date, method, ip, url, request, costTime, response, err }
}

// Response logging format
const formatRes = ({ method, ip, url, request, response }, costTime) => {
    ip = ip.replace(/^.*:/, '')
    const date = new Date().toLocaleString()
    return { date, method, ip, url, request, costTime, response }
}

export { formatError, formatRes }