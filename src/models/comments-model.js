export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  addComment(comment) {
    if (comment) {
      const newComment = {
        id: this._comments.length + 1,
        author: `user`,
        text: comment.text,
        date: comment.date,
        emotion: comment.emotion,
      };
      this._comments.unshift(newComment);

      return true;
    }
    return false;
  }

  removeComment(id) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    return true;
  }
}
