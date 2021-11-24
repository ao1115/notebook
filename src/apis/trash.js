
import request from "../helpers/request";
const URL = {
    GET: '/notes/trash',
    REVERT: '/notes/:noteId/revert',
    DELETE: '/notes/:noteId/confirm',
}
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            return request(URL.GET,).then(res => {
                res.data = res.data.sort((a, b) => b.createdAt < a.createdAt)
                res.data.forEach(note => {
                    let date = new Date(note.createdAt)
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes();
                    note.createdAt = M + D + h + m
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    deleteNote({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    revertNote({ noteId }) {
        return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
    }
}