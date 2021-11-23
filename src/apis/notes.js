import request from "../helpers/request";
const URL = {
    GET: '/notes/from/:notebookId',
    UPDATE: '/notes/to/:notebookId',
    DELETE: '/notes/:noteId',
    ADD: '/notes/:noteId'
}
export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            return request(URL.GET.replace(':notebookId', notebookId)).then(res => {
                res.data = res.data.sort((a, b) => b.createdAt < a.createdAt)
                res.data.forEach(note => {
                    let date = new Date(note.createdAt)
                    console.log(date)
                    // let Y = date.getFullYear() + '-';
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes();
                    console.log(M + D + h + m);
                    note.createdAt = M + D + h + m
                })
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    updateNote(noteId, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },
    deleteNote(noteId) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    addNote(notebookId, { title = "", content = "" } = { title: {}, content: {} }) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
    }
}