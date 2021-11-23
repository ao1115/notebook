import request from "../helpers/request";
const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    DELETE: '/notes/:noteId',
    UPDATE: '/notes/:noteId'
}
export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            return request(URL.GET.replace(':notebookId', notebookId)).then(res => {
                res.data = res.data.map(note => { note.createAt, note.updatedAt; return note }).sort((a, b) => a.updateAt - b.updateAt)
                res.data.forEach(note => {
                    let date = new Date(note.updatedAt)
                    console.log(date)
                    // let Y = date.getFullYear() + '-';
                    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    let D = date.getDate() + ' ';
                    let h = date.getHours() + ':';
                    let m = date.getMinutes();
                    console.log(M + D + h + m);
                    note.updatedAt = M + D + h + m
                    console.log(note.updatedAt)
                })
                resolve(res)
                console.log(res)
            }).catch(err => {
                reject(err)
            })
        })

    },
    updateNote({ noteId }, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },
    deleteNote({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    addNote({ notebookId }, { title = "", content = "" } = { title: {}, content: {} }) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
    }
}