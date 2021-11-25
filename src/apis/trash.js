import dayjs from "dayjs";
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
                res.data = res.data.sort((a, b) => b.updatedAt < a.updatedAt)
                res.data.forEach(notebook => {
                    let date = new Date(notebook.updatedAt).toISOString()
                    let d = dayjs(date).format('MM-DD HH:mm')
                    notebook.updatedAt = d
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